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
    const { distance, velocity } = await this.httpClient.toDrive(this.carParams.id);
    this.finishTime = +(distance / velocity / 1000).toFixed(3);
    this.distancePerSecond = document.body.offsetWidth / (Math.round(distance / velocity) / 900) / 60;
    console.log(this.finishTime, this.distancePerSecond);
    this.startRace();
  }

  private async startRace(id = this.carParams.id) {
    this.isRace = true;
    this.controller = new AbortController();
    try {
      this.moveCar();
      const response = await this.httpClient.startCar(id, this.controller);
      console.log(response);
      if (response.status === 200) {
        console.log(id, 'finished');
      }
    } catch (err) {
      console.error(`${this.carParams.name} has broken`);
    } finally {
      this.isRace = false;
      this.controller.abort();
    }
  }

  private moveCar(coveredDistance = 0) {
    // console.log(coveredDistance);
    if (!this.isRace) return;
    const { width } = document.body.getBoundingClientRect();
    let currentDistance = coveredDistance;
    if (currentDistance < width - 70) {
      currentDistance += this.distancePerSecond;
      this.viewCreator.node.style.setProperty('--shift', `${currentDistance}px`);
      requestAnimationFrame(this.moveCar.bind(this, currentDistance));
    } else {
      this.viewCreator.node.style.setProperty('--shift', `${width - 70}px`);
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
    controls.addInnerNode(start);
    return controls;
  }
}
