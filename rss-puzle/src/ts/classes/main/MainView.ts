import './mainView.scss';
import View from '../common/view/VIew';
import LoginPageView from '../loginPage/LoginPageView';
import StartScreenView from '../startScreen/StartScreenView';

export default class MainView extends View {
  private loginPage: LoginPageView | null = null;

  private startScreen: StartScreenView | null = null;

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
        this.loginPage = new LoginPageView();
        this.startScreen?.remove();
        this.addNodeInside(this.loginPage);
        return;
      }
      this.startScreen = new StartScreenView();
      this.loginPage?.remove();
      this.addNodeInside(this.startScreen);
    });
  }
}
