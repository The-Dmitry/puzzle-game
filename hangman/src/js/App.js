import MainView from './view/main/MainVIew';

export default class App {
  constructor() {
    this.main = new MainView();
    this.startApp();
  }

  startApp() {
    document.body.append(this.main.getElement());
  }
}
