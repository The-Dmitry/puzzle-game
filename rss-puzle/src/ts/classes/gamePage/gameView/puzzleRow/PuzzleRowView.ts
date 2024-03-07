import View from '../../../common/view/VIew';

export default class PuzzleRowView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['puzzle-row'],
    });
  }

  public makeActive(isActive: boolean) {
    if (isActive) {
      this.viewCreator.addClassName('active-row');
      return;
    }
    this.viewCreator.removeCLassName('active-row');
  }
}
