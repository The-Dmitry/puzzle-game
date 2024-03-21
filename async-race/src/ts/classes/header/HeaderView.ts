import { HeaderLinkParams } from '../../types/HeaderLinkParams';
import View from '../common/view/View';
import { HeaderLinkView } from './headerLinkView/HeaderLinkView';

const linksData: HeaderLinkParams[] = [
  {
    text: 'garage',
    href: '/garage',
  },
  {
    text: 'winners',
    href: '/winners',
  },
];

export default class HeaderView extends View {
  constructor() {
    super({
      tag: 'header',
      css: ['header'],
    });
    this.render();
  }

  private render() {
    const links: HeaderLinkView[] = [];
    linksData.forEach((data) => {
      const link = new HeaderLinkView(data, links);
      links.push(link);
    });
    this.addNodeInside(...links);
  }

  private removeLinkActiveStyle() {
    const links: HeaderLinkView[] = [];
    links.forEach((link) => link.removeActiveStyle());
  }
}
