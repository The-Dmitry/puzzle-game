import './loginView.scss';
import NodeParams from '../../../interfaces/NodeParams';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/View';
import Controller from '../../controller/Controller';
import LoginNameView from './inputView/LoginNameView';
import LoginPasswordView from './inputView/LoginPasswordView';
import SocketResponse from '../../../interfaces/SocketResponse';
import { LoginPayload } from '../../../types/LoginPayload';
import { PayloadsTypes } from '../../../types/PayloadTypes';
import { Routes } from '../../common/router/Routes';

const nodesData: Record<string, NodeParams> = {
  parentNode: {
    tag: 'div',
    css: ['login-page'],
  },
  submitBtn: {
    tag: 'button',
    css: ['login-button'],
    text: 'sing in',
  },
  loginContainer: {
    tag: 'div',
    css: ['login-view__container'],
  },
};

export default class LoginView extends View {
  private login: string | null = null;

  private password: string | null = null;

  constructor(private readonly controller: Controller<PayloadsTypes>) {
    super({ tag: 'div', css: ['login-view'] });
    this.render();
    this.makeSubscription();
  }

  private render() {
    const login = new LoginNameView();
    const password = new LoginPasswordView();
    const container = new NodeCreator({ ...nodesData.loginContainer }).addInnerNode(
      login.viewCreator,
      password.viewCreator,
      new NodeCreator({
        ...nodesData.submitBtn,
        callback: () => this.tryToLogin(),
      })
    );
    this.addNodeInside(container);
  }

  private tryToLogin() {
    if (this.login && this.password) {
      this.controller.authorization('USER_LOGIN', this.login, this.password, (data: SocketResponse<LoginPayload>) =>
        this.redirectToMain(data)
      );
    }
  }

  private redirectToMain(data: SocketResponse<LoginPayload>) {
    if ('user' in data.payload) {
      window.history.pushState(null, '', Routes.MAIN);
    } else {
      console.log(data.payload.error);
    }
  }

  private makeSubscription() {
    this.state
      .subscribe(this.viewCreator, 'appLogin', (v) => {
        this.login = v;
        // console.log(this.login);
      })
      .next(() => null);
    this.state.subscribe(this.viewCreator, 'appPassword', (v) => {
      this.password = v;
      // console.log(this.password);
    });
  }
}
