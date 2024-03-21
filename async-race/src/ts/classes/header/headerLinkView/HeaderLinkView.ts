import { HeaderLinkParams } from '../../../types/HeaderLinkParams';
import View from '../../common/view/View';

export class HeaderLinkView extends View {
  private headerLinks: HeaderLinkView[] = [];

  constructor({ text, href }: HeaderLinkParams, links: HeaderLinkView[]) {
    super({
      tag: 'a',
      css: ['header-link'],
      text,
      href,
      callback: (e) => this.onClick(e),
    });
    this.headerLinks = links;
  }

  private onClick(e: Event) {
    e.preventDefault();
    this.setActiveStyle();
  }

  public setActiveStyle() {
    this.headerLinks.forEach((link) => link.removeActiveStyle());
    this.viewCreator.addClassName('header-link_active');
  }

  public removeActiveStyle() {
    this.viewCreator.removeCLassName('header-link_active');
  }
}
