import './mainView.scss';
import View from '../common/view/VIew';
import LoginPageView from '../loginPage/LoginPageView';
import StartScreenView from '../startScreen/StartScreenView';
import GamePageView from '../gamePage/gamePageView';

export default class MainView extends View {
  private activePage: View | null = null;

  constructor() {
    super({
      tag: 'div',
      css: ['app'],
    });
    this.configureView();
  }

  private configureView() {
    // this.state.subscribe(this.viewCreator, 'loginData', (v) => {
    //   if (!v) {
    //     this.render(new LoginPageView());
    //     return;
    //   }
    //   this.render(new StartScreenView(() => this.render(new GamePageView())));
    // });
    this.render(new GamePageView());
  }

  private render(page: View) {
    this.activePage?.remove();
    this.activePage = page;
    this.addNodeInside(this.activePage);
  }
}
