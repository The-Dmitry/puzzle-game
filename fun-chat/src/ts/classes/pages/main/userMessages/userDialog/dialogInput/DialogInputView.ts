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
    const input = new InputNodeCreator({ tag: 'input', type: 'text', css: ['field-input'] });
    input.setCallback((e) => {
      if (e instanceof KeyboardEvent && e.code === 'Enter') {
        this.sendMessage(input.node);
      }
    }, 'keypress');
    const submit = new NodeCreator({
      tag: 'button',
      text: 'Send',
      css: ['field-submit'],
      callback: () => this.sendMessage(input.node),
    });
    this.addNodeInside(input, submit);
  }

  private sendMessage(input: HTMLInputElement) {
    const node = input;
    const { value } = input;
    if (value && value.replaceAll(' ', '')) {
      this.controller.sendMessage(this.targetLogin, value);
      node.value = '';
    }
  }
}
