import NodeCreator from '../../../../../../common/nodeCreator/NodeCreator';
import View from '../../../../../../common/view/View';

export default class SeparatorView extends View {
  constructor() {
    super({ tag: 'li', css: ['dialog__message-separator'] });
    this.render();
  }

  private render() {
    const text = new NodeCreator({ tag: 'p', css: ['separator-text'], text: 'New Messages' });
    const leftLine = new NodeCreator({ tag: 'div', css: ['separator-line'] });
    const rightLine = new NodeCreator({ tag: 'div', css: ['separator-line'] });
    this.addNodeInside(leftLine, text, rightLine);
  }
}
