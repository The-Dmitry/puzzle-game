import './winnersView.scss';
import WinnerInfo from '../../interfaces/WinnerInfo';
import { WinnersOrder } from '../../types/WinnersOrder';
import { WinnersSort } from '../../types/WinnersSort';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';

export default class WinnersView extends View {
  private grid = new NodeCreator({ tag: 'div', css: ['winners-grid'] });

  private order: WinnersOrder = 'ASC';

  private sort: WinnersSort = 'id';

  constructor() {
    super({
      tag: 'div',
      css: ['winners'],
    });
    this.render();
  }

  private render() {
    this.addNodeInside(this.grid);
    this.state.subscribe(this.viewCreator, 'updateWinners', () => this.renderGrid());
  }

  private renderGrid(page: number = 1, sort: WinnersSort = this.sort, order: WinnersOrder = this.order) {
    this.getWinners(page, sort, order);
  }

  private async getWinners(page: number, sort: WinnersSort, order: WinnersOrder) {
    const [data, pageCount] = await this.httpClient.getWinnersList(page, sort, order);
    const list = data.map((winner) => this.createInfoRow(winner));
    this.grid.removeAllChildren();
    this.grid.addInnerNode(this.createControls(), ...list);
  }

  private createControls() {
    const row = new NodeCreator({
      tag: 'div',
      css: ['winners-grid__row'],
    });
    const id = new NodeCreator({
      tag: 'button',
      css: ['control-item'],
      text: '№',
      callback: () => this.switchSorting('id'),
    });
    if (this.sort === 'id') {
      id.addClassName(this.order === 'ASC' ? 'control-item_asc' : 'control-item_desc');
    }
    const image = new NodeCreator({ tag: 'div', css: ['control-item'] });
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
      text: 'Best time',
      callback: () => this.switchSorting('time'),
    });
    if (this.sort === 'time') {
      bestTime.addClassName(this.order === 'ASC' ? 'control-item_asc' : 'control-item_desc');
    }
    row.addInnerNode(id, image, name, wins, bestTime);
    return row;
  }

  private createInfoRow({ id, time, wins }: WinnerInfo) {
    const row = new NodeCreator({ tag: 'div', css: ['winners-grid__row'] });
    const num = new NodeCreator({ tag: 'div', text: `${id}` });
    const image = new NodeCreator({ tag: 'div', text: 'img' });
    const name = new NodeCreator({ tag: 'div', text: 'name' });
    const winsNum = new NodeCreator({ tag: 'div', text: `${wins}` });
    const bestTime = new NodeCreator({ tag: 'div', text: `${time.toFixed(2)}` });
    this.getNameAndColor(id, name, image);
    row.addInnerNode(num, image, name, winsNum, bestTime);
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
}
