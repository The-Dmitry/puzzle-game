import './trackView.scss';
import View from '../../common/view/View';
import TrackLineView from '../trackLineView/TrackLineView';
import NodeCreator from '../../common/nodeCreator/NodeCreator';

export default class TrackView extends View {
  private trackLines: TrackLineView[] = [];

  constructor() {
    super({
      tag: 'ul',
      css: ['track'],
    });
    this.render();
  }

  private async render() {
    this.state.subscribe(this.viewCreator, 'updateTrack', () => this.createTrackLines());
    // this.createTrackLines();
  }

  private async createTrackLines(page: number = 1) {
    this.trackLines.forEach((track) => track.remove());
    this.trackLines = [];
    try {
      const [carsParams, totalCount] = await this.httpClient.getCars(1);
      const tracks = carsParams.map((car) => new TrackLineView(car));
      this.trackLines.push(...tracks);
      this.addNodeInside(...this.trackLines);
    } catch (e) {
      console.log(e);
    }
  }

  public async startRace() {
    try {
      const prepare = await Promise.allSettled(this.trackLines.map((track) => track.prepareToRace()));
      const result = await Promise.any(this.trackLines.map((track) => track.startRace()));
      console.log(result);
    } catch (err) {
      console.log(`The race has been cancelled`);
    }
  }

  public async stopRace() {
    return Promise.all(this.trackLines.map((track) => track.resetCar()));
  }
}
