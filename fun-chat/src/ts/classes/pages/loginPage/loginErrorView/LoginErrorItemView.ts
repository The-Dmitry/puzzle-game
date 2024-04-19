import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/View';

export default class LoginErrorItemView extends View {
  constructor(private readonly text: string) {
    super({ tag: 'li', css: ['login-error__item', 'error-item'] });
    this.render();
  }

  private render() {
    const close = new NodeCreator({ tag: 'button', css: ['error-item__close'], callback: () => this.remove() });
    const text = new NodeCreator({ tag: 'p', css: ['error-item__text'], text: `Error: ${this.text}` });
    const timer = new NodeCreator({ tag: 'div', css: ['error-item__timer'] });
    const timerLine = new NodeCreator({ tag: 'div', css: ['error-item__timer-line'] });
    timerLine.setCallback(() => this.remove(), 'animationend');
    timer.addInnerNode(timerLine);
    this.addNodeInside(close, text, timer);
  }
}
