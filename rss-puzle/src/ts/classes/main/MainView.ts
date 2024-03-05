import './mainView.scss';
import View from '../common/view/VIew';
import LoginPageView from '../loginPage/LoginPageView';

export default class MainView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['main'],
    });
    this.render();
  }

  private render() {
    this.state.subscribe(this.viewNode, 'loginData', (v) => {
      if (!v) {
        const loginPage = new LoginPageView();
        this.addNodeInside(loginPage);
      }
    });
  }
}
