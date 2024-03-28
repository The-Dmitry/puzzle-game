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

  private renderGrid() {
    this.grid.removeAllChildren();
    this.grid.addInnerNode(this.createControls());
    this.getWinners();
  }

  private async getWinners() {
    const [data, pageCount] = await this.httpClient.getWinnersList();
    const list = data.map((winner) => this.createInfoRow(winner));
    this.grid.addInnerNode(...list);
  }

  private createControls() {
    const row = new NodeCreator({ tag: 'div', css: ['winners-grid__row'] });
    const id = new NodeCreator({ tag: 'button', text: '№' });
    const image = new NodeCreator({ tag: 'div', text: 'img' });
    const name = new NodeCreator({ tag: 'div', text: 'name' });
    const wins = new NodeCreator({ tag: 'button', text: 'wins' });
    const bestTime = new NodeCreator({ tag: 'button', text: 'bestTime' });
    row.addInnerNode(id, image, name, wins, bestTime);
    return row;
  }

  private createInfoRow({ id, time, wins }: WinnerInfo) {
    const row = new NodeCreator({ tag: 'div', css: ['winners-grid__row'] });
    const num = new NodeCreator({ tag: 'div', text: `${id}` });
    const image = new NodeCreator({ tag: 'div', text: 'img' });
    const name = new NodeCreator({ tag: 'div', text: 'name' });
    const winsNum = new NodeCreator({ tag: 'div', text: `${wins}` });
    const bestTime = new NodeCreator({ tag: 'div', text: `${time}` });
    this.getNameAndColor(id, name, image);
    row.addInnerNode(num, image, name, winsNum, bestTime);
    return row;
  }

  private async getNameAndColor(id: WinnerInfo['id'], nameNode: NodeCreator, imageNode: NodeCreator) {
    const { name, color } = await this.httpClient.getOneCar(id);
    nameNode.setTextContent(name);
    imageNode.node.style.setProperty('--car-color', color);
  }
}
