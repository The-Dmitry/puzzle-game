import Router from './common/router/Router';
import { Routes } from './common/router/Routes';
import View from './common/view/View';
import GarageView from './garage/GarageView';
import HeaderView from './header/HeaderView';
import WinnersView from './winners/WinnersView';

export default class App {
  private garage = new GarageView();

  private winners = new WinnersView();

  private header = new HeaderView();

  private activePage: null | View = null;

  private router = new Router(this.createRoutes(), this.render.bind(this));

  public start() {
    document.body.append(this.header.viewCreator.node);
  }

  private render(view: View, href: string) {
    this.activePage?.viewCreator.node.remove();
    document.body.append(view.viewCreator.node);
    this.activePage = view;
    this.header.handleLinkStyle(href);
  }

  private createRoutes(): [string, View][] {
    return [
      [Routes.garage, this.garage],
      [Routes.winners, this.winners],
    ];
  }
}
