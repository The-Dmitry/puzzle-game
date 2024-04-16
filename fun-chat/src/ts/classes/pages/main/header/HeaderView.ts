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
    const appTitle = new NodeCreator({ tag: 'h1', text: 'RS', css: ['app-title'] }).addInnerNode(
      new NodeCreator({ tag: 'span', text: 'gram' })
    );
    const name = new NodeCreator({ tag: 'p', css: ['header-login'], text: userName });
    const logout = new NodeCreator({
      tag: 'button',
      css: ['header-logout'],
      callback: () => this.state.next('logout', (v) => !v),
    });
    this.addNodeInside(appTitle, name, logout);
  }
}
