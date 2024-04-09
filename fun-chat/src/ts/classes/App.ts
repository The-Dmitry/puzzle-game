import SocketResponse from '../interfaces/SocketResponse';
import { LoginPayload } from '../types/LoginPayload';
import { TypesOfView } from '../types/TypesOfView';
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

  public tryToLogin(login: string, password: string) {
    this.controller.authorization('USER_LOGIN', login, password, (data: SocketResponse<LoginPayload>) => {
      // console.log('LOGIN', data);
      if ('user' in data.payload) {
        window.history.replaceState(null, '', Routes.MAIN);
      } else {
        console.error(data.payload.error);
        this.state.clearState();
        this.state.next('isWsActive', () => true);
        window.history.replaceState(null, '', Routes.AUTHORIZATION);
      }
    });
  }

  private logout() {
    const login = this.state.getValue('appLogin') ?? '';
    const password = this.state.getValue('appPassword') ?? '';
    this.controller.authorization<LoginPayload>('USER_LOGOUT', login, password, (data) => {
      if ('user' in data.payload) {
        this.state.clearState();
        this.state.next('isWsActive', () => true);
        window.history.replaceState({}, '', Routes.AUTHORIZATION);
      } else {
        console.log(data.payload.error);
      }
    });
  }

  private makeSubscription() {
    const reconnectNotice = new NodeCreator({ tag: 'div', css: ['reconnect'], text: 'reconnect' });
    this.state.subscribe(null, 'logout', () => this.logout(), false);
    this.state.next('isWsActive', () => false);
    this.state.subscribe(
      null,
      'isWsActive',
      (v) => {
        const login = this.state.getValue('appLogin');
        const password = this.state.getValue('appPassword');
        // console.log(login);

        if (v && login && password) {
          this.tryToLogin(login, password);
        }
        if (v) {
          reconnectNotice.remove();
        } else {
          document.body.append(reconnectNotice.node);
        }
      },
      false
    );
  }
}
