import InputNodeCreator from '../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import StateParams from '../../common/state/StateParams';
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
    const notice = new NodeCreator({
      ...LoginPageNodesData.loginNotice,
    });
    const input = new InputNodeCreator({
      ...LoginInputNodesData.loginInput,
      tag: 'input',
      placeholder: `Enter your ${this.inputName}`,
    });
    input.node.autofocus = true;
    input.setCallback(() => {
      this.inputValidation(input.node.value, notice);
    }, 'input');
    this.addNodeInside(input, notice);
  }

  private inputValidation(text: string, notice: NodeCreator) {
    notice.setTextContent(' ');
    if (text && !/^[a-zA-Z-^]+$/.test(text)) {
      notice.setTextContent('Use only english characters');
      this.state.next(`login${this.inputName.replace(' ', '')}` as keyof StateParams, () => false);
      return;
    }
    if ((text && text[0] !== text[0].toUpperCase()) || text[0] === '-') {
      notice.setTextContent('The first letter must be uppercase');
      this.state.next(`login${this.inputName.replace(' ', '')}` as keyof StateParams, () => false);
      return;
    }
    if (text && text.length < this.minLength) {
      notice.setTextContent(`${this.inputName} is too short`);
      this.state.next(`login${this.inputName.replace(' ', '')}` as keyof StateParams, () => false);
      return;
    }
    if (text) this.state.next(`login${this.inputName.replace(' ', '')}` as keyof StateParams, () => true);
  }
}
