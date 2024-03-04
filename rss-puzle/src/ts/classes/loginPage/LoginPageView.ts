import './loginPage.scss';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';
import LoginInputView from './LoginInput/LoginInputView';
import LoginPageNodesData from './loginPageNodesData';

export default class LoginPageView extends View {
  constructor() {
    super({ ...LoginPageNodesData.parentNode });
    this.render();
  }

  private render() {
    const container = new NodeCreator({ ...LoginPageNodesData.loginContainer });
    const nameInput = new LoginInputView('First name', 3);
    const surnameInput = new LoginInputView('Surname', 4);
    const submit = new NodeCreator({
      ...LoginPageNodesData.submitBtn,
    });
    container.addInnerNode(nameInput.node, surnameInput.node, submit);
    this.addNodeInside(container);
  }
}
