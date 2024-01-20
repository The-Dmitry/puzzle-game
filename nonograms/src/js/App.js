import MainView from './view/main/MainView';

export default class App {
  constructor() {
    document.body.append(new MainView().getElement());
  }
}
