import './dialogInputView.scss';
import InputNodeCreator from '../../../../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../../../../common/nodeCreator/NodeCreator';
import View from '../../../../../common/view/View';
import Controller from '../../../../../controller/Controller';

export default class DialogInputView extends View {
  constructor(
    private readonly controller: Controller,
    private readonly targetLogin: string
  ) {
    super({ tag: 'div', css: ['messages-input-field'] });
    this.render();
  }

  private render() {
    const input = new InputNodeCreator({ tag: 'input', type: 'text' });
    const submit = new NodeCreator({
      tag: 'button',
      text: 'Send',
      callback: () => {
        const { value: text } = input.node;
        if (text) {
          this.controller.sendMessage(this.targetLogin, text);
        }
      },
    });
    this.addNodeInside(input, submit);
  }
}
