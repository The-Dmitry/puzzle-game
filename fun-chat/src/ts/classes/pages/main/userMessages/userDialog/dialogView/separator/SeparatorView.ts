import NodeCreator from '../../../../../../common/nodeCreator/NodeCreator';
import View from '../../../../../../common/view/View';

export default class SeparatorView extends View {
  constructor() {
    super({ tag: 'li', css: ['dialog__message-separator'] });
    this.render();
  }

  private render() {
    const container = new NodeCreator({ tag: 'div', css: ['separator-container'] }).addInnerNode(
      new NodeCreator({ tag: 'div', css: ['separator-line'] }),
      new NodeCreator({ tag: 'p', css: ['separator-text'], text: 'New Messages' }),
      new NodeCreator({ tag: 'div', css: ['separator-line'] })
    );
    this.addNodeInside(container);
  }
}
