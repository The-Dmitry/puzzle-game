import View from '../../../classes/View';
import sounds from '../../../data/sounds';

export default class FieldCellView extends View {
  #isMarked = false;

  #isFlagged = false;

  #needPaint;

  constructor(needPaint, checkVictory) {
    const params = {
      tag: 'div',
      css: ['cell'],
      callback: () => {
        this.setMark();
        this.playSound(sounds.popdown);
        checkVictory();
      },
    };
    super(params);
    this.viewNode.setCallback((e) => {
      this.playSound(sounds.popup);
      this.setFlag(e);
    }, 'contextmenu');
    this.#needPaint = needPaint;
  }

  setMark() {
    if (this.#isMarked) {
      this.viewNode.removeCLassName('cell_marked');
      this.#isMarked = false;

      return;
    }
    this.viewNode.addClassName('cell_marked');
    this.#isMarked = true;
    this.#isFlagged = true;
    this.setFlag();
  }

  setFlag() {
    if (this.#isFlagged) {
      this.viewNode.removeCLassName('cell_flagged');
      this.#isFlagged = false;
      return;
    }
    this.viewNode.addClassName('cell_flagged');
    this.#isMarked = true;
    this.#isFlagged = true;
    this.setMark();
  }

  isMarkedCorrectly() {
    return (
      (this.#isMarked && this.#needPaint) ||
      (!this.#isMarked && !this.#needPaint)
    );
  }

  resetCell() {
    this.#isMarked = false;
    this.#isFlagged = false;
    this.viewNode.setClassNames(['cell']);
  }

  showSolution() {
    if (!this.#needPaint && this.#isMarked) {
      this.viewNode.removeCLassName('cell_marked');
      return;
    }
    if (this.#needPaint) {
      this.viewNode.removeCLassName('cell_flagged');
      this.viewNode.addClassName('cell_marked');
    }
  }

  getStatus() {
    if (this.isMarked) {
      return 'marked';
    }
    if (this.isFlagged) {
      return 'flagged';
    }
    return false;
  }

  setStatus(status) {
    if (status === 'marked') {
      this.setMark();
      return;
    }
    if (status === 'flagged') {
      this.setFlag();
    }
  }
}
