import GarageView from './garage/GarageView';
import HeaderView from './header/HeaderView';
import WinnersView from './winners/WinnersView';

export default class App {
  private garage = new GarageView();

  private winners = new WinnersView();

  public start() {
    document.body.append(new HeaderView().viewCreator.node);
  }
}
