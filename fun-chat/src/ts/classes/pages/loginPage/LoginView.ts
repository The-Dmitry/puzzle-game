import './loginView.scss';
import NodeParams from '../../../interfaces/NodeParams';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import LoginNameView from './inputView/LoginNameView';
import LoginPasswordView from './inputView/LoginPasswordView';
import { Routes } from '../../common/router/Routes';
import View from '../../common/view/View';
import LoginErrorView from './loginErrorView/LoginErrorView';

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
  private loginNode = new LoginNameView(() => this.isLoginDataValid());

  private passwordNode = new LoginPasswordView(() => this.isLoginDataValid());

  private submitBtn = new NodeCreator({
    ...nodesData.submitBtn,
    tag: 'button',
    callback: () => this.tryToLogin(),
  });

  private loginErrorNode = new LoginErrorView();

  constructor(private loginFunc: (login: string, password: string) => void) {
    super({ tag: 'div', css: ['login-view'] });
    if (this.state.getValue('appLogin')) {
      window.history.replaceState(null, '', Routes.MAIN);
    } else {
      this.render();
      this.state.subscribe(this.viewCreator, 'loginErrorMessage', (v) => v && this.loginErrorNode.showError(v), false);
    }
  }

  private render() {
    const title = new NodeCreator({ tag: 'h1', css: ['login-title'], text: 'RSgram' });
    const container = new NodeCreator({ ...nodesData.loginContainer }).addInnerNode(
      title,
      this.loginNode.viewCreator,
      this.passwordNode.viewCreator,
      this.submitBtn,
      new NodeCreator({
        tag: 'button',
        text: 'About',
        css: ['login-view__about'],
        callback: () => window.history.pushState({}, '', Routes.ABOUT),
      })
    );
    this.isLoginDataValid();
    this.state.subscribe(this.viewCreator, 'loginByEnter', () => this.tryToLogin(), false);
    this.addNodeInside(container, this.loginErrorNode);
  }

  public tryToLogin() {
    if (this.loginNode.getValue && this.passwordNode.getValue) {
      this.loginFunc(this.loginNode.getValue, this.passwordNode.getValue);
    }
  }

  private isLoginDataValid() {
    this.submitBtn.node.disabled = !(this.loginNode.getValue && this.passwordNode.getValue);
  }
}
