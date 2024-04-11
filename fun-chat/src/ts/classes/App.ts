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

  public tryToLogin(login: string, password: string) {
    this.controller.authorization('USER_LOGIN', login, password, (data: LoginResponse) => {
      if (data.type === 'USER_LOGIN') {
        // Delete before deploy
        this.startChatBot();
        window.history.replaceState(null, '', Routes.MAIN);
      } else {
        console.error(data.payload);
        this.state.clearState();
        this.state.next('isWsActive', () => true);
        window.history.replaceState(null, '', Routes.AUTHORIZATION);
      }
    });
  }

  // Delete before deploy
  private startChatBot() {
    const API = 'ws://localhost:4000';
    const MSG = ['Sure', 'Great!', 'Right', 'Yup', 'Cool!'];
    const s = new WebSocket(API);
    s.addEventListener('open', () => {
      s.send(
        JSON.stringify({
          id: '1',
          type: 'USER_LOGIN',
          payload: { user: { id: '1', login: 'Chat Bot', password: '123' } },
        })
      );
    });
    s.addEventListener('message', ({ data }) => {
      const { type, payload } = JSON.parse(data);
      if (type === 'MSG_SEND' && payload.message.to === 'Chat Bot')
        setTimeout(() => {
          s.send(
            JSON.stringify({
              id: '2',
              type: 'MSG_SEND',
              payload: { message: { to: payload.message.from, text: MSG[Math.floor(Math.random() * MSG.length)] } },
            })
          );
        }, 1500);
    });
  }

  private logout() {
    const login = this.state.getValue('appLogin') ?? '';
    const password = this.state.getValue('appPassword') ?? '';
    this.controller.authorization<LogoutResponse>('USER_LOGOUT', login, password, (data) => {
      if (data.type === 'USER_LOGOUT') {
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
