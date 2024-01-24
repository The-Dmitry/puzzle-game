import View from '../../../classes/View';

export default class FieldCellView extends View {
  isMarked = false;

  isFlagged = false;

  constructor(needPaint, checkVictory) {
    const params = {
      tag: 'div',
      css: ['cell'],
      callback: () => {
        this.setMark();
        checkVictory();
      },
    };
    super(params);
    this.viewNode.setCallback((e) => this.setFlag(e), 'contextmenu');
    this.needPaint = needPaint;
    if (this.needPaint) {
      // this.viewNode.addClassName('cell_marked');
    }
  }

  setMark() {
    if (this.isMarked) {
      this.viewNode.removeCLassName('cell_marked');
      this.isMarked = false;
      return;
    }
    this.viewNode.addClassName('cell_marked');
    this.isMarked = true;
    this.isFlagged = true;
    this.setFlag();
  }

  setFlag() {
    if (this.isFlagged) {
      this.viewNode.removeCLassName('cell_flagged');
      this.isFlagged = false;
      return;
    }
    this.viewNode.addClassName('cell_flagged');
    this.isMarked = true;
    this.isFlagged = true;
    this.setMark();
  }

  isMarkedCorrectly() {
    return this.isMarked && this.needPaint;
  }
}
