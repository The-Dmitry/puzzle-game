import './garageView.scss';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';
import TrackView from './trackView/TrackView';
import WorkshopView from './createCarView/WorkshopView';
import carBrands from '../../data/car-brands';
import carModels from '../../data/car-models';
import VictoryView from './victoryView/VictoryView';
import NoServerView from '../noServerView/noServerView';

export default class GarageView extends View {
  private track = new TrackView(this.showWinner.bind(this));

  private carCountNode = new NodeCreator({ tag: 'p', text: 'Cars in garage: 0', css: ['garage-title'] });

  private currentPage = 1;

  private totalPageCount = 1;

  private startBtn = new NodeCreator({
    tag: 'button',
    css: ['garage__start-race', 'garage-button'],
    text: 'start race',
    callback: () => {
      this.track.startRace();
      this.startBtn.node.disabled = true;
      this.stopBtn.node.disabled = false;
      this.state.next('raceInProgress', () => true);
    },
  });

  private stopBtn = new NodeCreator({
    tag: 'button',
    css: ['garage__stop-race', 'garage-button'],
    text: 'stop race',
    callback: async () => {
      this.stopBtn.node.disabled = true;
      await this.track.stopRace();
      this.startBtn.node.disabled = false;
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
    this.state.subscribe(this.viewCreator, 'blockView', (v) => this.blockView(!!v), false);
  }

  private render() {
    const addNewCar = new NodeCreator({
      tag: 'button',
      css: ['garage-button', 'create-car__button'],
      text: 'create car',
      callback: () => document.body.append(new WorkshopView().viewCreator.node),
    });
    const addHundredCars = new NodeCreator({
      tag: 'button',
      css: ['garage-button', 'create-hundred__button'],
      text: 'create 100',
      callback: () => this.generateOneHundredCars(),
    });
    this.state.subscribe(this.viewCreator, 'raceInProgress', (v) => {
      addNewCar.node.disabled = !!v;
      addHundredCars.node.disabled = !!v;
    });
    this.addNodeInside(
      this.createControls(),
      this.carCountNode,
      this.track,
      addNewCar,
      addHundredCars,
      this.createPagination()
    );
    this.stopBtn.node.disabled = true;
  }

  private async getCars() {
    try {
      const [carsParams, totalCount] = await this.httpClient.getCars(this.currentPage);
      this.totalPageCount = totalCount ? Math.ceil(+totalCount / 7) : 1;
      this.carCountNode.setTextContent(`Cars in garage: ${totalCount}`);
      this.track.createTrackLines(carsParams);
      if (this.currentPage > this.totalPageCount) {
        this.switchPage(-1);
      }

      this.state.next('garagePage', (v) => v);
    } catch {
      this.removeAllChildren();
      this.addNodeInside(new NoServerView());
    }
  }

  private createControls() {
    const controls = new NodeCreator({ tag: 'div', css: ['garage__controls'] });
    controls.addInnerNode(this.startBtn, this.stopBtn);
    return controls;
  }

  private switchPage(num: number) {
    this.currentPage += num;
    this.getCars();
    this.state.next('garagePage', (v) => v);
  }

  private createPagination() {
    const pagination = new NodeCreator({ tag: 'div', css: ['pagination'] });
    const prev = new NodeCreator({
      tag: 'button',
      text: 'prev',
      css: ['garage-button', 'pagination__prev'],
      callback: () => {
        this.switchPage(-1);
      },
    });
    const next = new NodeCreator({
      tag: 'button',
      text: 'next',
      css: ['garage-button', 'pagination__next'],
      callback: () => {
        this.switchPage(+1);
      },
    });
    const page = new NodeCreator({ tag: 'p', text: `${this.currentPage}` });
    this.state.subscribe(
      this.viewCreator,
      'raceInProgress',
      (v) => {
        next.node.disabled = !!v;
        prev.node.disabled = !!v;
        if (!v) this.state.next('garagePage', (val) => val);
      },
      false
    );
    this.state.subscribe(this.viewCreator, 'garagePage', () => {
      next.node.disabled = this.currentPage === this.totalPageCount;
      prev.node.disabled = this.currentPage === 1;
      page.setTextContent(`${this.currentPage}`);
    });
    pagination.addInnerNode(prev, page, next);
    return pagination;
  }

  private async generateOneHundredCars() {
    const brands = carBrands;
    const models = carModels;
    await Promise.all(
      new Array(100)
        .fill('')
        .map(() =>
          this.httpClient.createCar(
            `${brands[Math.floor(Math.random() * brands.length)]} ${models[Math.floor(Math.random() * models.length)]}`,
            `#${Math.floor(Math.random() * 16777215).toString(16)}`
          )
        )
    );
    this.getCars();
  }

  private showWinner(name: string, time: number) {
    this.addNodeInside(new VictoryView(name, time));
  }

  private blockView(bool: boolean) {
    if (bool) {
      this.viewCreator.addClassName('locked');
      return;
    }
    this.viewCreator.removeCLassName('locked');
  }
}
