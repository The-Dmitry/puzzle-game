import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/View';
import './footerView.scss';

export default class FooterView extends View {
  constructor() {
    super({ tag: 'footer', css: ['footer'] });
    this.render();
  }

  private render() {
    const git = new NodeCreator({
      tag: 'a',
      href: 'https://github.com/The-Dmitry',
      css: ['footer-git'],
      text: 'The-Dmitry',
    });
    const year = new NodeCreator({ tag: 'p', text: '2024', css: ['footer-year'] });
    const school = new NodeCreator({ tag: 'a', href: 'https://rs.school/', css: ['footer-school'] });
    this.addNodeInside(git, school, year);
  }
}
