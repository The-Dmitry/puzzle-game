import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/View';
import './headerView.scss';

export default class HeaderView extends View {
  constructor() {
    super({ tag: 'header', css: ['header'] });
    this.render();
  }

  private render() {
    let userName = '';
    this.state.subscribe(this.viewCreator, 'appLogin', (login) => {
      userName = login ?? '';
    });
    const name = new NodeCreator({ tag: 'p', css: ['header-login'], text: `Name: ${userName}` });
    const logout = new NodeCreator({
      tag: 'button',
      text: 'Logout',
      css: ['header-logout'],
      callback: () => this.state.next('logout', (v) => !v),
    });
    this.addNodeInside(name, logout);
  }
}
