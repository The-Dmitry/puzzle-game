import './notFoundView.scss';
import View from '../../common/view/View';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import { Routes } from '../../common/router/Routes';

export default class NotFoundView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['not-found'],
    });
    this.render();
  }

  private render() {
    const container = new NodeCreator({ tag: 'div', css: ['not-found_container'] }).addInnerNode(
      new NodeCreator({ tag: 'p', css: ['not-found__message'], text: 'Page not found' }),
      new NodeCreator({
        tag: 'button',
        css: ['not-found__button'],
        text: 'Back',
        callback: () => window.history.replaceState(null, '', Routes.MAIN),
      })
    );
    this.addNodeInside(container);
  }
}
