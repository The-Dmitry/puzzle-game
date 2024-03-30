import './winnersView.scss';
import WinnerInfo from '../../interfaces/WinnerInfo';
import { WinnersOrder } from '../../types/WinnersOrder';
import { WinnersSort } from '../../types/WinnersSort';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';
import CarView from '../carView/CarView';
import NoServerView from '../noServerView/noServerView';

export default class WinnersView extends View {
  private grid = new NodeCreator({ tag: 'div', css: ['winners-grid'] });

  private order: WinnersOrder = 'ASC';

  private sort: WinnersSort = 'time';

  private currentPage = 1;

  private totalPageCount = 1;

  constructor() {
    super({
      tag: 'div',
      css: ['winners'],
    });
    this.render();
  }

  private render() {
    this.addNodeInside(this.grid, this.createPagination());
    this.state.subscribe(this.viewCreator, 'updateWinners', () => this.renderGrid());
  }

  private renderGrid(page: number = 1, sort: WinnersSort = this.sort, order: WinnersOrder = this.order) {
    this.getWinners(page, sort, order);
  }

  private async getWinners(page: number, sort: WinnersSort, order: WinnersOrder) {
    try {
      const [data, totalCount] = await this.httpClient.getWinnersList(page, sort, order);
      this.totalPageCount = totalCount ? Math.ceil(+totalCount / 10) : 1;
      if (this.currentPage > this.totalPageCount) this.switchPage(-1);
      const list = data.map((winner) => this.createInfoRow(winner));
      this.state.next('winnersPage', (v) => v);
      this.grid.removeAllChildren();
      this.grid.addInnerNode(this.createControls(), ...list);
    } catch {
      this.removeAllChildren();
      this.addNodeInside(new NoServerView());
    }
  }

  private createControls() {
    const row = new NodeCreator({ tag: 'div', css: ['winners-grid__row'] });
    const id = new NodeCreator({
      tag: 'div',
      css: ['control-item'],
      text: '№',
    });
    // if (this.sort === 'id') {
    //   id.addClassName(this.order === 'ASC' ? 'control-item_asc' : 'control-item_desc');
    // }
    const image = new NodeCreator({ tag: 'div', css: ['control-item'], text: 'Color' });
    const name = new NodeCreator({ tag: 'div', text: 'Name' });
    const wins = new NodeCreator({
      tag: 'button',
      css: ['control-item'],
      text: 'Wins',
      callback: () => this.switchSorting('wins'),
    });
    if (this.sort === 'wins') {
      wins.addClassName(this.order === 'ASC' ? 'control-item_asc' : 'control-item_desc');
    }
    const bestTime = new NodeCreator({
      tag: 'button',
      css: ['control-item'],
      text: 'Time',
      callback: () => this.switchSorting('time'),
    });
    if (this.sort === 'time') {
      bestTime.addClassName(this.order === 'ASC' ? 'control-item_asc' : 'control-item_desc');
    }
    row.addInnerNode(id, name, image, wins, bestTime);
    return row;
  }

  private createInfoRow({ id, time, wins }: WinnerInfo) {
    const row = new NodeCreator({ tag: 'div', css: ['winners-grid__row'] });
    const num = new NodeCreator({ tag: 'div', text: `${id}`, css: ['winner-id'] });
    const image = new CarView(['track-line_car']);
    const name = new NodeCreator({ tag: 'div', text: 'name', css: ['winner-name'] });
    const winsNum = new NodeCreator({ tag: 'div', text: `${wins}`, css: ['winner-win-count'] });
    const bestTime = new NodeCreator({ tag: 'div', text: `${time.toFixed(2)}`, css: ['winner-time'] });
    this.getNameAndColor(id, name, image.viewCreator);
    row.addInnerNode(num, name, image.viewCreator, winsNum, bestTime);
    return row;
  }

  private async getNameAndColor(id: WinnerInfo['id'], nameNode: NodeCreator, imageNode: NodeCreator) {
    const { name, color } = await this.httpClient.getOneCar(id);
    nameNode.setTextContent(name);
    imageNode.node.style.setProperty('--car-color', color);
  }

  private switchSorting(sort: WinnersSort) {
    if (this.sort === sort) {
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
      this.renderGrid();
      return;
    }
    this.sort = sort;
    this.order = 'ASC';
    this.renderGrid();
  }

  private switchPage(num: number) {
    this.currentPage += num;
    this.renderGrid(this.currentPage);
    this.state.next('winnersPage', (v) => v);
  }

  private createPagination() {
    const pagination = new NodeCreator({ tag: 'div', css: ['pagination'] });
    const prev = new NodeCreator({
      tag: 'button',
      text: 'prev',
      css: ['garage-button'],
      callback: () => this.switchPage(-1),
    });
    const next = new NodeCreator({
      tag: 'button',
      text: 'next',
      css: ['garage-button'],
      callback: () => this.switchPage(1),
    });
    const page = new NodeCreator({ tag: 'p', text: `${this.currentPage}` });

    this.state.subscribe(this.viewCreator, 'winnersPage', () => {
      next.node.disabled = this.currentPage === this.totalPageCount;
      prev.node.disabled = this.currentPage === 1;
      page.setTextContent(`${this.currentPage}`);
    });
    pagination.addInnerNode(prev, page, next);
    return pagination;
  }
}
