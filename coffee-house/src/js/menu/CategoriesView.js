import View from '../classes/View';
import CategoriesContentView from './CategoriesContentView';
import CategoriesNavigationView from './CategoriesNavigationView';

const container = document.querySelector('.menu');

class CategoriesView extends View {
  navigation;

  content;

  constructor() {
    const params = {
      tag: 'div',
      cssClasses: ['menu__container'],
    };
    super(params);
    container.append(this.viewNode.getNode());
    this.configureView();
  }

  configureView() {
    this.navigation = new CategoriesNavigationView(this.switchCategory.bind(this));
    this.content = new CategoriesContentView();
    this.addViewInside(this.navigation, this.content);
  }

  switchCategory(category) {
    this.content.createCards(category);
  }
}

const app = new CategoriesView();
