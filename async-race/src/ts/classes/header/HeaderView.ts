import './headerView.scss';
import { HeaderLinkParams } from '../../types/HeaderLinkParams';
import View from '../common/view/View';
import { HeaderLinkView } from './headerLinkView/HeaderLinkView';
import { Routes } from '../common/router/Routes';

const linksData: HeaderLinkParams[] = [
  {
    text: 'garage',
    href: Routes.garage,
  },
  {
    text: 'winners',
    href: Routes.winners,
  },
];

export default class HeaderView extends View {
  private links: Map<string, HeaderLinkView> = new Map();

  constructor() {
    super({
      tag: 'header',
      css: ['header'],
    });
    this.render();
  }

  private render() {
    linksData.forEach((data) => {
      const link = new HeaderLinkView(data);
      this.addNodeInside(link.viewCreator);
      this.links.set(data.href, link);
    });
  }

  public handleLinkStyle(href: string) {
    this.links.forEach((link) => link.removeActiveStyle());
    if (href) {
      this.links.get(href)?.setActiveStyle();
    }
  }
}
