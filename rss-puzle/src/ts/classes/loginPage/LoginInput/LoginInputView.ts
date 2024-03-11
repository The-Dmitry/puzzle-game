import NodeParams from '../../../interfaces/NodeParams';
import InputNodeCreator from '../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import StateParams from '../../common/state/StateParams';
import View from '../../common/view/VIew';

const nodesData: Record<string, NodeParams> = {
  inputParent: {
    tag: 'div',
    css: ['field'],
  },
  loginNotice: {
    tag: 'p',
    css: ['login-notice'],
  },
};

export default class LoginInputView extends View {
  constructor(
    private readonly inputName: string,
    private readonly minLength: number,
    private readonly actionName: keyof StateParams
  ) {
    super({ ...nodesData.inputParent });

    this.render();
  }

  private render() {
    const notice = new NodeCreator({
      ...nodesData.loginNotice,
    });
    const input = new InputNodeCreator({
      tag: 'input',
      css: ['login-input'],
      type: 'text',
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
    if (!text.length) {
      notice.setTextContent(' ');
      this.state.next(this.actionName as keyof StateParams, () => null);
      return;
    }
    if (text && !/^[a-zA-Z-^]+$/.test(text)) {
      notice.setTextContent('Use only english characters');
      this.state.next(this.actionName as keyof StateParams, () => null);
      return;
    }
    if ((text && text[0] !== text[0].toUpperCase()) || text[0] === '-') {
      notice.setTextContent('The first letter must be uppercase');
      this.state.next(this.actionName as keyof StateParams, () => null);
      return;
    }
    if (text && text.length < this.minLength) {
      notice.setTextContent(`${this.inputName} is too short`);
      this.state.next(this.actionName as keyof StateParams, () => null);
      return;
    }
    if (text) this.state.next(this.actionName as keyof StateParams, () => text);
  }
}
