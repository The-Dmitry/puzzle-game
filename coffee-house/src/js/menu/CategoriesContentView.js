import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';
import CardView from './CardView';
import menuData from './menu-data';
import refresh from './refreshSvg';

export default class CategoriesContentView extends View {
  data = menuData;

  currentFilter = 'coffee';

  variant = 'mobile';

  createdVariant;

  constructor() {
    const params = {
      tag: 'div',
      css: ['menu-content'],
    };
    super(params);
    this.createCards();
    window.addEventListener('resize', () => this.createCards());
  }

  createCards(category = this.currentFilter) {
    if (this.checkWidth() && category === this.currentFilter) {
      return;
    }
    this.createdVariant = this.variant;
    this.currentFilter = category;
    const arr = this.data
      .filter((item) => item.category === category)
      .map((el) => new CardView(el));
    if (this.createdVariant === 'desktop') {
      this.setCards(arr);
      return;
    }
    const showAll = new NodeCreator({
      tag: 'button',
      css: ['menu__show-all'],
      callback: () => this.setCards(arr),
    });
    showAll.getNode().innerHTML = refresh;
    this.setCards(arr.slice(0, 4), arr.length > 4 ? showAll : null);
  }

  setCards(nodes, btn) {
    this.viewNode.removeAllChildren();
    this.addViewInside(...nodes);
    if (btn) {
      this.viewNode.addInnerNode(btn);
    }
  }

  checkWidth() {
    const width = document.body.clientWidth;
    this.variant = width > 768 ? 'desktop' : 'mobile';
    return this.variant === this.createdVariant;
  }
}
