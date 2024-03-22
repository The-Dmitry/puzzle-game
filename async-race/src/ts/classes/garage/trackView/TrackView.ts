import './trackView.scss';
import View from '../../common/view/View';
import TrackLineView from '../trackLineView/TrackLineView';

export default class TrackView extends View {
  constructor() {
    super({
      tag: 'ul',
      css: ['track'],
    });
    this.render();
  }

  private async render() {
    const [carsParams, totalCount] = await this.httpClient.getCars(1);
    if (carsParams) {
      const tracks = carsParams.map((car) => new TrackLineView(car));
      this.addNodeInside(...tracks);
    }
  }
}
