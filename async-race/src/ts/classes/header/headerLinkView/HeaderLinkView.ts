import { HeaderLinkParams } from '../../../types/HeaderLinkParams';
import View from '../../common/view/View';

export class HeaderLinkView extends View {
  private headerLinks: HeaderLinkView[] = [];

  constructor({ text, href }: HeaderLinkParams) {
    super({
      tag: 'a',
      css: ['header-link'],
      text,
      href,
      callback: (e) => this.onClick(e),
    });
  }

  private onClick(e: Event) {
    e.preventDefault();
    window.history.pushState(null, '', (e.target as HTMLAnchorElement).href);
    this.setActiveStyle();
  }

  public setActiveStyle() {
    this.viewCreator.addClassName('header-link_active');
  }

  public removeActiveStyle() {
    this.viewCreator.removeCLassName('header-link_active');
  }
}
