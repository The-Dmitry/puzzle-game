import './loginPage.scss';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';
import LoginInputView from './LoginInput/LoginInputView';
import LoginPageNodesData from './loginPageNodesData';

export default class LoginPageView extends View {
  private isNameValid = false;

  private isSurNameValid = false;

  constructor() {
    super({ ...LoginPageNodesData.parentNode });
    this.render();
  }

  private render() {
    this.generateLoginForm();
  }

  private generateLoginForm() {
    const container = new NodeCreator({ ...LoginPageNodesData.loginContainer });
    const nameInput = new LoginInputView('first name', 3);
    const surnameInput = new LoginInputView('surname', 4);
    const submit = new NodeCreator({
      ...LoginPageNodesData.submitBtn,
      tag: 'button',
    });
    container.addInnerNode(nameInput.viewNode, surnameInput.viewNode, submit);
    this.addNodeInside(container);
    this.state
      .subscribe(this.viewNode, 'loginfirstname', (v) => {
        this.isNameValid = v ?? false;
        submit.node.disabled = !(this.isNameValid && this.isSurNameValid);
      })
      .next(() => false);
    this.state
      .subscribe(this.viewNode, 'loginsurname', (v) => {
        this.isSurNameValid = v ?? false;
        submit.node.disabled = !(this.isNameValid && this.isSurNameValid);
      })
      .next(() => false);
  }
}
