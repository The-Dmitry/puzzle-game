import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';

export default class NotFoundView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['garage'],
    });
    this.render();
  }

  private render() {
    const text = new NodeCreator({
      tag: 'p',
      text: 'NOT FOUND',
    });
    this.addNodeInside(text);
  }
}
