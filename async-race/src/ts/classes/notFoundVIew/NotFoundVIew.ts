import './notFoundView.scss';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';

export default class NotFoundView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['not-found'],
    });
    this.render();
  }

  private render() {
    const text = new NodeCreator({
      tag: 'p',
      text: 'PAGE NOT FOUND',
    });
    this.addNodeInside(text);
  }
}
