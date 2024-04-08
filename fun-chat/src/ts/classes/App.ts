import { TypesOfView } from '../types/TypesOfView';
import Router from './common/router/Router';
import { Routes } from './common/router/Routes';
import Controller from './controller/Controller';

export default class App {
  private router = new Router(this.createRoutes());

  private controller = new Controller();

  private activeView: TypesOfView = null;

  public start() {}

  private createRoutes() {
    const list = {
      [Routes.AUTHORIZATION]: async () => {
        const { default: LoginView } = await import('./pages/loginPage/LoginView');
        this.setContent(new LoginView(this.controller));
      },
      [Routes.MAIN]: async () => {
        const { default: MainView } = await import('./pages/main/MainView');
        this.setContent(new MainView(this.controller));
      },
      [Routes.ABOUT]: async () => {
        const { default: AboutView } = await import('./pages/about/AboutView');
        this.setContent(new AboutView());
      },
      [Routes.NOT_FOUND]: async () => {
        const { default: NotFoundView } = await import('./pages/notFound/NotFoundView');
        this.setContent(new NotFoundView());
      },
    };
    return new Map(Object.entries(list));
  }

  private setContent(view: NonNullable<TypesOfView>) {
    this.activeView?.remove();
    this.activeView = view;
    document.body.append(this.activeView.viewCreator.node);
  }
}
