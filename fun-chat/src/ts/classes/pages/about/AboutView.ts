import './aboutView.scss';
import View from '../../common/view/View';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import { Routes } from '../../common/router/Routes';

const aboutText =
  'The application was developed during the RSSchool JS/FE 2023Q3 programming course. All coincidence of design, with real applications, are considered accidental :D';

export default class AboutView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['about'],
    });
    this.render();
  }

  private render() {
    const container = new NodeCreator({ tag: 'div', css: ['about-container'] });
    const title = new NodeCreator({ tag: 'h1', text: 'Rsgram', css: ['about-title'] });
    const text = new NodeCreator({ tag: 'p', text: aboutText, css: ['about-text'] });
    const author = new NodeCreator({
      tag: 'a',
      href: 'https://github.com/The-Dmitry',
      text: 'Author: The-Dmitry',
      css: ['about-author'],
    });
    const back = new NodeCreator({
      tag: 'button',
      text: 'Back',
      css: ['about-button'],
      callback: () => window.history.pushState({}, '', Routes.MAIN),
    });
    container.addInnerNode(title, text, author, back);
    this.addNodeInside(container);
  }
}
