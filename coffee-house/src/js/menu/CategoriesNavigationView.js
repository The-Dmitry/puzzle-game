import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';

const categories = ['coffee', 'tea', 'dessert'];

export default class CategoriesNavigationView extends View {
  constructor(func) {
    const params = {
      tag: 'div',
      css: ['menu-navigation'],
    };
    super(params);
    this.configureView(func);
  }

  configureView(func) {
    const btns = [...categories].map((item) => {
      const button = new NodeCreator({
        tag: 'button',
        text: item,
        css: ['menu-navigation__button'],
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
