import './loginView.scss';
import NodeParams from '../../../interfaces/NodeParams';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import LoginNameView from './inputView/LoginNameView';
import LoginPasswordView from './inputView/LoginPasswordView';
import { Routes } from '../../common/router/Routes';
import View from '../../common/view/View';

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

  constructor(private loginFunc: (login: string, password: string) => void) {
    super({ tag: 'div', css: ['login-view'] });
    if (this.state.getValue('appLogin')) {
      window.history.replaceState(null, '', Routes.MAIN);
    } else {
      this.render();
    }
  }

  private render() {
    const title = new NodeCreator({ tag: 'h1', css: ['login-title'], text: 'RSgram' });
    const container = new NodeCreator({ ...nodesData.loginContainer }).addInnerNode(
      title,
      this.loginNode.viewCreator,
      this.passwordNode.viewCreator,
      this.submitBtn
    );
    this.isLoginDataValid();
    this.state.subscribe(this.viewCreator, 'loginByEnter', () => this.tryToLogin(), false);
    this.addNodeInside(container);
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
