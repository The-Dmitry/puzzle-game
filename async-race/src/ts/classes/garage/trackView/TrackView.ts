import './trackView.scss';
import View from '../../common/view/View';
import TrackLineView from '../trackLineView/TrackLineView';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import CarInfo from '../../../interfaces/CarInfo';

export default class TrackView extends View {
  private trackLines: TrackLineView[] = [];

  constructor() {
    super({
      tag: 'ul',
      css: ['track'],
    });
  }

  public async createTrackLines(carsInfo: CarInfo[]) {
    this.trackLines.forEach((track) => track.remove());
    this.trackLines = carsInfo.map((car) => new TrackLineView(car));
    this.addNodeInside(...this.trackLines);
  }

  public async startRace() {
    try {
      const prepare = await Promise.all(this.trackLines.map((track) => track.prepareToRace()));
      const { id, time, name } = await Promise.any(this.trackLines.map((track) => track.startRace()));
      await this.httpClient.saveWinner({ id, time });
      setTimeout(async () => {
        const data = await this.httpClient.getWinnersList();
        console.log(data);
      }, 3000);
      this.state.next('updateWinners', (v) => v);
    } catch (err) {
      console.log(`The race has been cancelled`);
    }
  }

  public async stopRace() {
    return Promise.all(this.trackLines.map((track) => track.resetCar()));
  }
}
