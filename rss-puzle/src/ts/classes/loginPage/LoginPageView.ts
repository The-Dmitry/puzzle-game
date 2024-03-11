import './loginPage.scss';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';
import LoginInputView from './LoginInput/LoginInputView';
import NodeParams from '../../interfaces/NodeParams';

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
    css: ['login-page__container'],
  },
};

export default class LoginPageView extends View {
  private isNameValid: string | null = null;

  private isSurNameValid: string | null = null;

  constructor() {
    super({ ...nodesData.parentNode });
    this.render();
  }

  private render() {
    this.generateLoginForm();
  }

  private generateLoginForm() {
    const container = new NodeCreator({ ...nodesData.loginContainer });
    const nameInput = new LoginInputView('first name', 3, 'validFirstName');
    const surnameInput = new LoginInputView('surname', 4, 'validSurname');
    const submit = new NodeCreator({
      ...nodesData.submitBtn,
      tag: 'button',
      callback: () => this.submitUserData(),
    });
    container.addInnerNode(nameInput.viewCreator, surnameInput.viewCreator, submit);
    this.addNodeInside(container);
    this.makeSubscription(submit);
  }

  private makeSubscription(submit: NodeCreator<'button'>) {
    const { node } = submit;
    this.state
      .subscribe(this.viewCreator, 'validFirstName', (v) => {
        this.isNameValid = v;
        node.disabled = !(this.isNameValid && this.isSurNameValid);
      })
      .next(() => null);

    this.state
      .subscribe(this.viewCreator, 'validSurname', (v) => {
        this.isSurNameValid = v;
        node.disabled = !(this.isNameValid && this.isSurNameValid);
      })
      .next(() => null);
  }

  private submitUserData() {
    this.state.next('loginData', () => {
      if (!(typeof this.isNameValid === 'string' && typeof this.isSurNameValid === 'string')) {
        return null;
      }
      return [this.isNameValid, this.isSurNameValid];
    });
  }
}
