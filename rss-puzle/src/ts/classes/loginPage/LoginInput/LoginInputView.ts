import InputNodeCreator from '../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/VIew';
import LoginPageNodesData from '../loginPageNodesData';
import LoginInputNodesData from './LoginInputNodesData';

export default class LoginInputView extends View {
  constructor(
    private readonly inputName: string,
    private readonly minLength: number
  ) {
    super({ ...LoginPageNodesData.inputParent });
    this.render();
  }

  private render() {
    const input = new InputNodeCreator({
      ...LoginInputNodesData.loginInput,
      placeholder: `Enter your ${this.inputName}`,
    });
    const notice = new NodeCreator({
      ...LoginPageNodesData.loginNotice,
    });
    this.addNodeInside(input, notice);
  }
}
