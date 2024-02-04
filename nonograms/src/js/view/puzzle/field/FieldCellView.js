import View from '../../../classes/View';
import Observer from '../../../classes/observer/Observer';
import ObserverActions from '../../../classes/observer/observerActions';
import sounds from '../../../data/sounds';

export default class FieldCellView extends View {
  #isMarked = false;

  #isFlagged = false;

  #needPaint;

  #soundMuted = false;

  #observer = Observer.getInstance();

  constructor(needPaint, checkVictory, soundState) {
    const params = {
      tag: 'div',
      css: ['cell'],
      callback: () => {
        this.setMark();
        if (!this.#soundMuted) {
          this.playSound(sounds.popdown);
        }
        checkVictory();
      },
    };
    super(params);
    this.viewNode.setCallback((e) => {
      if (!this.#soundMuted) {
        this.playSound(sounds.popup);
      }
      this.setFlag(e);
    }, 'contextmenu');
    this.#soundMuted = soundState;
    this.#needPaint = needPaint;
    this.#observer.subscribe(ObserverActions.muteSound, (boolean) => {
      this.#soundMuted = boolean;
    });
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
    if (this.#isMarked) {
      return 'marked';
    }
    if (this.#isFlagged) {
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
