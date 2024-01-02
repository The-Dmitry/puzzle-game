import './gallows.css';
import NodeCreator from '../../classes/NodeCreator';
import View from '../View';

const MISTAKES_CSS = {
  1: 'gallows__head',
  2: 'gallows__body',
  3: 'gallows__left-arm',
  4: 'gallows__right-arm',
  5: 'gallows__left-leg',
  6: 'gallows__right-leg',
};

export default class GallowsView extends View {
  mistakes = 0;

  constructor() {
    super({
      tag: 'div',
      css: ['gallows-container'],
    });
    this.configureView();
  }

  configureView() {
    this.gallows = new NodeCreator({
      tag: 'div',
      css: ['gallows'],
    });
    this.viewNode.addInnerNode(this.gallows);
  }

  setBodyParts(num) {
    if (num) {
      this.gallows.addInnerNode(
        new NodeCreator({
          tag: 'div',
          css: [MISTAKES_CSS[num]],
        })
      );
      return;
    }
    this.gallows.removeAllChildren();
  }

  resetGallows() {
    this.mistakes = 0;
  }
}
