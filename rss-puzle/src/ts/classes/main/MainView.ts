import './mainView.scss';
import View from '../common/view/VIew';
import LoginPageView from '../loginPage/LoginPageView';

export default class MainView extends View {
  private loginPage: LoginPageView = new LoginPageView();

  constructor() {
    super({
      tag: 'div',
      css: ['main'],
    });
    this.addNodeInside(this.loginPage);
  }
}
