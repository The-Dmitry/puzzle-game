import MainView from './main/MainView';

export default class App {
  private main: MainView;

  constructor() {
    this.main = new MainView();
  }

  public start() {
    document.body.append(this.main.viewCreator.node);
  }
}
