import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';

const categories = ['coffee', 'tea', 'dessert'];

export default class CategoriesNavigationView extends View {
  constructor(func) {
    const params = {
      tag: 'div',
      cssClasses: ['menu-navigation'],
    };
    super(params);
    this.configureView(func);
  }

  configureView(func) {
    const btns = [...categories].map((item, index) => {
      const button = new NodeCreator({
        tag: 'button',
        textContent: item,
        cssClasses: ['menu-navigation__button'],
        callback: () => {
          func(item);
          btns.forEach((btn) => btn.setClassNames(['menu-navigation__button']));
          button.setClassNames(['menu-navigation__button', 'menu-navigation__button_selected']);
        },
      });
      return button;
    });
    btns[0].setClassNames(['menu-navigation__button', 'menu-navigation__button_selected']);
    this.viewNode.addInnerNode(...btns);
  }
}
