import InputNodeCreator from '../../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/View';

export default class LoginInputView extends View {
  protected input = new InputNodeCreator({
    tag: 'input',
    css: ['login-input'],
    type: 'text',
    placeholder: `Login...`,
  });

  protected notice = new NodeCreator({ tag: 'p', css: ['login-field__notice'], text: '' });

  protected value: string | null = null;

  constructor() {
    super({ tag: 'div', css: ['login-field'] });
    this.addNodeInside(this.input, this.notice);
  }

  public get getValue() {
    return this.value;
  }
}
