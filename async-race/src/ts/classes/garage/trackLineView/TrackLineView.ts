import './trackLineView.scss';
import CarInfo from '../../../interfaces/CarInfo';
import View from '../../common/view/View';
import CarView from '../../carView/CarView';
import NodeCreator from '../../common/nodeCreator/NodeCreator';

export default class TrackLineView extends View {
  private finishTime = 0;

  private distancePerSecond = 0;

  private controller = new AbortController();

  private isRace = false;

  private width = 0;

  constructor(private carParams: CarInfo) {
    super({
      tag: 'li',
      css: ['track-line'],
    });
    this.render();
  }

  private render() {
    console.log(document.body.offsetWidth);

    this.addNodeInside(new CarView(this.carParams.color, ['track-line_car']), this.createControls());
  }

  private async prepareToRace() {
    const { distance, velocity } = await this.httpClient.engineControl(this.carParams.id, 'started');
    this.finishTime = +(distance / velocity / 1000).toFixed(3);
    this.distancePerSecond = +(document.body.offsetWidth / (Math.round(distance / velocity) / 900) / 60).toFixed(2);
    this.startRace();
  }

  private async startRace(id = this.carParams.id) {
    this.isRace = true;
    try {
      this.moveCar();
      const response = await this.httpClient.startCar(id, this.controller);
      console.log(response);
      if (response.status !== 200) {
        this.isRace = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  private moveCar(coveredDistance = 0) {
    if (!this.isRace) return;
    this.width = document.body.getBoundingClientRect().width;

    let currentDistance = coveredDistance;
    if (currentDistance < this.width - 110) {
      this.viewCreator.node.style.setProperty('--shift', `${currentDistance}px`);
      currentDistance += this.distancePerSecond;
      requestAnimationFrame(this.moveCar.bind(this, currentDistance));
    } else {
      this.isRace = false;
    }
  }

  private createControls() {
    const controls = new NodeCreator({
      tag: 'div',
      css: ['track-line__controls'],
    });
    const start = new NodeCreator({
      tag: 'button',
      css: ['track-line__button'],
      text: 'start',
      callback: () => this.prepareToRace(),
    });
    const stop = new NodeCreator({
      tag: 'button',
      css: ['track-line__button'],
      text: 'stop',
      callback: () => this.resetCar(),
    });
    controls.addInnerNode(start, stop);
    return controls;
  }

  private async resetCar() {
    this.controller.abort();
    this.isRace = false;
    this.viewCreator.node.removeAttribute('style');
    const result = await this.httpClient.engineControl(this.carParams.id, 'stopped');
    console.log(result);
    this.controller = new AbortController();
  }
}
