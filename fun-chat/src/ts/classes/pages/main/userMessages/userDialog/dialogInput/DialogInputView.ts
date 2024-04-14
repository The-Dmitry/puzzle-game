import './dialogInputView.scss';
import InputNodeCreator from '../../../../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../../../../common/nodeCreator/NodeCreator';
import View from '../../../../../common/view/View';
import Controller from '../../../../../controller/Controller';

export default class DialogInputView extends View {
  private input = new InputNodeCreator({ tag: 'input', type: 'text', css: ['field-input'] });

  private editIndicator: NodeCreator | null = null;

  private editData: { text: string; id: string } | null = null;

  constructor(
    private readonly controller: Controller,
    private readonly targetLogin: string,
    private readonly readAllMessages: () => void
  ) {
    super({ tag: 'div', css: ['messages-input-field'] });
    this.render();
  }

  private render() {
    this.input.setCallback((e) => {
      if (e instanceof KeyboardEvent && ['NumpadEnter', 'Enter'].includes(e.code)) {
        this.sendMessage(this.input.node);
      }
    }, 'keypress');
    const submit = new NodeCreator({
      tag: 'button',
      text: 'Send',
      css: ['field-submit'],
      callback: () => this.sendMessage(this.input.node),
    });
    this.state.subscribe(
      this.viewCreator,
      'editMessage',
      (message) => {
        if (message) {
          this.editData = message;
          this.setEditMode();
        }
      },
      false
    );
    this.addNodeInside(this.input, submit);
  }

  private sendMessage(input: HTMLInputElement) {
    const node = input;
    const { value } = input;
    if (!(value && value.replaceAll(' ', ''))) return;
    if (this.editData) {
      this.controller.editMessage(this.editData.id, value);
      this.removeEditMode();
    } else {
      this.controller.sendMessage(this.targetLogin, value);
      this.readAllMessages();
      node.value = '';
    }
  }

  private setEditMode() {
    if (!this.editData) return;
    const indicator = new NodeCreator({
      tag: 'div',
      css: ['input-field__edit-indicator'],
      text: 'Editing',
    }).addInnerNode(
      new NodeCreator({ tag: 'div', css: ['edit-indicator__close'], callback: () => this.removeEditMode() })
    );
    this.editIndicator = indicator;
    this.addNodeInside(indicator);
    this.input.node.value = this.editData.text;
  }

  private removeEditMode() {
    this.input.node.value = '';
    this.editData = null;
    this.editIndicator?.remove();
    this.editIndicator = null;
  }
}
