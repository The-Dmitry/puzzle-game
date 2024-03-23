import './trackLineView.scss';
import CarInfo from '../../../interfaces/CarInfo';
import View from '../../common/view/View';
import CarView from '../../carView/CarView';
import NodeCreator from '../../common/nodeCreator/NodeCreator';

export default class TrackLineView extends View {
  private startBtn = new NodeCreator({
    tag: 'button',
    css: ['track-line__button'],
    text: 'start',
    callback: () => {
      this.soloRace();
      this.state.next('startSoloRace', (v) => v);
    },
  });

  private stopBtn = new NodeCreator({
    tag: 'button',
    css: ['track-line__button'],
    text: 'stop',
    callback: () => this.resetCar(),
  });

  private deleteCarBtn = new NodeCreator({
    tag: 'button',
    text: 'delete',
    callback: () => this.deleteCar(),
  });

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
    this.stopBtn.node.disabled = true;
    const text = new NodeCreator({
      tag: 'p',
      text: this.carParams.name,
      css: ['track-line__text'],
    });
    this.addNodeInside(new CarView(this.carParams.color, ['track-line_car']), this.createControls(), text);
  }

  private async soloRace() {
    try {
      await this.prepareToRace();
      await this.startRace();
    } catch {
      this.isRace = false;
    }
  }

  public async prepareToRace() {
    this.startBtn.node.disabled = true;
    this.stopBtn.node.disabled = false;
    this.deleteCarBtn.node.disabled = true;
    try {
      const { distance, velocity } = await this.httpClient.engineControl(this.carParams.id, 'started');
      this.finishTime = +(distance / velocity / 1000).toFixed(3);
      this.distancePerSecond = +(document.body.offsetWidth / (Math.round(distance / velocity) / 900) / 60).toFixed(2);
      return true;
    } catch (err) {
      this.resetCar();
      throw Error(`Car broke down${err}`);
    }
  }

  public async startRace() {
    this.isRace = true;
    try {
      this.moveCar();
      const response = await this.httpClient.startCar(this.carParams.id, this.controller);
      if (response.status === 200) {
        return {
          ...this.carParams,
          time: this.finishTime,
        };
      }
      return await Promise.reject();
    } catch (err) {
      this.isRace = false;
      throw Error(`Car broke down${err}`);
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

    controls.addInnerNode(this.startBtn, this.stopBtn, this.deleteCarBtn);
    return controls;
  }

  public async resetCar() {
    this.controller.abort();
    this.isRace = false;
    this.viewCreator.node.removeAttribute('style');
    this.controller = new AbortController();
    const result = await this.httpClient.engineControl(this.carParams.id, 'stopped');
    this.startBtn.node.disabled = false;
    this.stopBtn.node.disabled = true;
    this.deleteCarBtn.node.disabled = false;
    return result;
  }

  private async deleteCar() {
    await this.httpClient.deleteCar(this.carParams.id);
    this.state.next('updateTrack', (v) => v);
  }
}
