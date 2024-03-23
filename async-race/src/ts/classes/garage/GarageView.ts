import './garageView.scss';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';
import TrackView from './trackView/TrackView';
import WorkshopView from './createCarView/WorkshopView';

export default class GarageView extends View {
  private track = new TrackView();

  private currentPage = 1;

  private totalPageCount = 1;

  private startBtn = new NodeCreator({
    tag: 'button',
    css: ['garage__start-race'],
    text: 'start race',
    callback: () => {
      this.track.startRace();
      this.startBtn.node.disabled = true;
      this.stopBtn.node.disabled = false;
    },
  });

  private stopBtn = new NodeCreator({
    tag: 'button',
    css: ['garage__stop-race'],
    text: 'stop race',
    callback: async () => {
      await this.track.stopRace();
      this.startBtn.node.disabled = false;
      this.stopBtn.node.disabled = true;
    },
  });

  constructor() {
    super({ tag: 'div', css: ['garage'] });
    this.render();
    this.getCars();
    this.state.subscribe(
      this.viewCreator,
      'startSoloRace',
      () => {
        this.startBtn.node.disabled = true;
        this.stopBtn.node.disabled = false;
      },
      false
    );
    this.state.subscribe(this.viewCreator, 'updateTrack', () => {
      this.getCars();
    });
  }

  private render() {
    const addNewCar = new NodeCreator({
      tag: 'button',
      css: ['garage-button', 'create-car__button'],
      text: 'create car',
      callback: () => document.body.append(new WorkshopView().viewCreator.node),
    });
    this.addNodeInside(this.createControls(), this.track, this.createPagination(), addNewCar);
    this.stopBtn.node.disabled = true;
  }

  private async getCars() {
    try {
      const [carsParams, totalCount] = await this.httpClient.getCars(this.currentPage);
      console.log(totalCount);
      this.totalPageCount = totalCount ? Math.ceil(+totalCount / 7) : 1;
      this.track.createTrackLines(carsParams);
    } catch (e) {
      console.log(e);
    }
  }

  private createControls() {
    const controls = new NodeCreator({ tag: 'div', css: ['garage__controls'] });
    controls.addInnerNode(this.startBtn, this.stopBtn);
    return controls;
  }

  private createPagination() {
    const pagination = new NodeCreator({ tag: 'div', css: ['pagination'] });
    const prev = new NodeCreator({ tag: 'button', text: 'prev' });
    const next = new NodeCreator({ tag: 'button', text: 'next' });
    const page = new NodeCreator({ tag: 'p', text: `${this.currentPage}` });
    pagination.addInnerNode(prev, page, next);
    return pagination;
  }
}
