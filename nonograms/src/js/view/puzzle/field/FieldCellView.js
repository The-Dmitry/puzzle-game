import View from '../../../classes/View';

export default class FieldCellView extends View {
  isMarked = false;

  isFlagged = false;

  constructor(needPaint) {
    const params = {
      tag: 'div',
      css: ['cell'],
      callback: () => this.setMark(),
    };
    super(params);
    this.needPaint = needPaint;
  }

  setMark() {
    if (this.isMarked) {
      this.viewNode.removeCLassName('cell_marked');
      this.isMarked = false;
      return;
    }
    this.viewNode.addClassName('cell_marked');
    this.isMarked = true;
  }
}
