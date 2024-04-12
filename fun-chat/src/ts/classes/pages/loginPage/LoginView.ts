import './loginView.scss';
import NodeParams from '../../../interfaces/NodeParams';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/View';
import LoginNameView from './inputView/LoginNameView';
import LoginPasswordView from './inputView/LoginPasswordView';
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

  constructor(private loginFunc: (login: string, password: string) => void) {
    super({ tag: 'div', css: ['login-view'] });
    if(this.state.getValue('appLogin')) {
      window.history.replaceState(null, '', Routes.MAIN);
    } else {
      this.makeSubscription();
      this.render();
    }
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

  public tryToLogin() {
    if (this.login && this.password) this.loginFunc(this.login, this.password);
  }

  private makeSubscription() {
    this.state.subscribe(this.viewCreator, 'appLogin', (v) => {
      this.login = v;
    });
    this.state.subscribe(this.viewCreator, 'appPassword', (v) => {
      this.password = v;
    });
  }
}
