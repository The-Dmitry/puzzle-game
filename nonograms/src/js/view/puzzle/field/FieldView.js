import './FieldView.scss';
import View from '../../../classes/View';
import FieldCellView from './FieldCellView';
import Observer from '../../../classes/observer/Observer';
import ObserverActions from '../../../classes/observer/observerActions';

export default class FieldView extends View {
  playArea = [];

  scheme;

  isPlaying = false;

  observer = Observer.getInstance();

  constructor() {
    const params = {
      tag: 'div',
      css: ['field', 'field_10', 'puzzle__item'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}

  generateField(scheme, savedField) {
    this.isPlaying = false;
    this.viewNode.removeAllChildren();
    this.viewNode.setClassNames(['field', `field_${scheme.length}`]);
    this.playArea = scheme.map((arr) =>
      arr.map((info) => new FieldCellView(info, this.isVictory.bind(this)))
    );
    this.playArea.forEach((arr) => this.addViewInside(...arr));
    this.playArea = this.playArea.flat(5);
    if (savedField) {
      this.loadSavedField(savedField);
    }
  }

  isVictory() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.observer.dispatch(ObserverActions.startTimer);
    }
    for (let i = 0; i < this.playArea.length; i += 1) {
      if (!this.playArea[i].isMarkedCorrectly()) {
        console.log('NOT WIN');
        return false;
      }
    }
    this.viewNode.addClassName('solution');
    this.observer.dispatch(ObserverActions.victory);
    // this.observer.dispatch(ObserverActions.stopGame);
    return true;
  }

  resetGame() {
    this.viewNode.removeCLassName('solution');
    this.isPlaying = false;
    this.playArea.forEach((cell) => cell.resetCell());
  }

  showSolution() {
    this.viewNode.addClassName('solution');
    this.playArea.forEach((cell) => cell.showSolution());
  }

  saveGame() {
    return this.playArea.map((cell) => cell.getStatus());
  }

  loadSavedField(savedField) {
    this.playArea.forEach((cell, index) => cell.setStatus(savedField[index]));
  }
}
