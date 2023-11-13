import View from '../classes/View';
import NodeCreator from '../classes/NodeCreate';

export default class BurgerView extends View {
  burgerButton = document.querySelector('.burger');

  isOpened = false;

  constructor(isHome) {
    const params = {
      tag: 'div',
      css: ['burger-menu'],
      callback: () => this.manageMenu(),
    };
    super(params);
    this.generateMenu(isHome);
    this.burgerButton.addEventListener('click', this.manageMenu.bind(this));
    window.addEventListener('resize', (e) => {
      if (e.currentTarget.innerWidth > 768 && this.isOpened) {
        this.manageMenu();
      }
    });
  }

  generateMenu(isHome) {
    const startId = isHome ? '' : './home.html';
    const links = [
      new NodeCreator({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'Favorite coffee',
        href: `${startId}#favourite-coffee`,
      }),
      new NodeCreator({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'About',
        href: `${startId}#about`,
      }),
      new NodeCreator({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'Mobile app',
        href: `${startId}#mobile-app`,
      }),
      new NodeCreator({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'Contact us',
        href: `#footer`,
      }),
      new NodeCreator({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'Menu',
        href: './menu.html',
      }),
    ];
    this.viewNode.addInnerNode(...links);
  }

  manageMenu() {
    if (!this.isOpened) {
      document.body.append(this.viewNode.getNode());

      setTimeout(() => {
        this.viewNode.getNode().classList.add('burger-menu_open');
      }, 0);
    } else {
      this.viewNode.setClassNames(['burger-menu']);
      setTimeout(() => {
        this.viewNode.getNode().remove();
      }, 300);
    }
    this.isOpened = !this.isOpened;
    document.body.classList.toggle('blocked');
    this.burgerButton.classList.toggle('burger_active');
  }
}
