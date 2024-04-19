import { TypesOfView } from '../types/TypesOfView';
import { LoginResponse } from '../types/response/LoginResponse';
import { LogoutResponse } from '../types/response/LogoutResponse';
import NodeCreator from './common/nodeCreator/NodeCreator';
import Router from './common/router/Router';
import { Routes } from './common/router/Routes';
import State from './common/state/State';
import Controller from './controller/Controller';

export default class App {
  private router = new Router(this.createRoutes());

  private controller = new Controller();

  private activeView: TypesOfView = null;

  private state = State.getInstance();

  public start() {
    this.makeSubscription();
  }

  private createRoutes() {
    const list = {
      [Routes.AUTHORIZATION]: async () => {
        const { default: LoginView } = await import('./pages/loginPage/LoginView');
        this.setContent(new LoginView(this.tryToLogin.bind(this)));
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

  private tryToLogin(login: string, password: string) {
    this.controller.authorization('USER_LOGIN', login, password, (data: LoginResponse) => {
      if (data.type === 'USER_LOGIN') {
        this.state.next('appLogin', () => login);
        this.state.next('appPassword', () => password);
        if (window.location.href.replace(this.router.origin, '') === Routes.AUTHORIZATION) {
          window.history.replaceState(null, '', Routes.MAIN);
        }
      } else {
        this.clearLoginInfo();
        console.error(data.payload);
        this.state.next('loginErrorMessage', () => data.payload.error);
        window.history.replaceState(null, '', Routes.AUTHORIZATION);
      }
    });
  }

  private logout() {
    const login = this.state.getValue('appLogin') ?? '';
    const password = this.state.getValue('appPassword') ?? '';
    this.clearLoginInfo();
    this.controller.authorization<LogoutResponse>('USER_LOGOUT', login, password, (data) => {
      if (data.type === 'USER_LOGOUT') {
        sessionStorage.clear();
        window.history.replaceState({}, '', Routes.AUTHORIZATION);
      } else {
        console.error(data.payload.error);
      }
    });
  }

  private makeSubscription() {
    const reconnectNotice = new NodeCreator({ tag: 'div', css: ['reconnect'], text: 'Connection' });
    this.state.subscribe(null, 'logout', () => this.logout(), false);
    this.state.subscribe(
      null,
      'isWsActive',
      (v) => {
        const login = this.state.getValue('appLogin');
        const password = this.state.getValue('appPassword');
        if (v && login && password) {
          this.tryToLogin(login, password);
        }
        if (v) {
          reconnectNotice.node.remove();
        } else {
          document.body.append(reconnectNotice.node);
        }
      },
      false
    );
  }

  private clearLoginInfo() {
    this.state.next('appLogin', () => null);
    this.state.next('appPassword', () => null);
  }
}
