import './trackView.scss';
import View from '../../common/view/View';
import TrackLineView from '../trackLineView/TrackLineView';
import CarInfo from '../../../interfaces/CarInfo';

export default class TrackView extends View {
  private trackLines: TrackLineView[] = [];

  constructor(private showWinner: (name: string, time: number) => void) {
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
      await Promise.all(this.trackLines.map((track) => track.prepareToRace()));
      const { id, time, name } = await Promise.any(this.trackLines.map((track) => track.startRace()));
      this.showWinner(name, time);
      this.state.next('raceInProgress', () => false);
      await this.httpClient.saveWinner({ id, time });
      this.state.next('updateWinners', (v) => v);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`The race has been cancelled`);
    }
  }

  public async stopRace() {
    return Promise.all(this.trackLines.map((track) => track.resetCar()));
  }
}
