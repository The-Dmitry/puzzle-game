import './FieldView.scss';
import View from '../../../classes/View';
import FieldCellView from './FieldCellView';

export default class FieldView extends View {
  playArea = [];

  scheme;

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
    for (let i = 0; i < this.playArea.length; i += 1) {
      if (!this.playArea[i].isMarkedCorrectly()) {
        console.log('NOT WIN');
        return false;
      }
    }
    console.log('WIN');
    return true;
  }

  resetGame() {
    this.playArea.forEach((cell) => cell.resetCell());
  }

  showSolution() {
    this.playArea.forEach((cell) => cell.showSolution());
  }

  saveGame() {
    return this.playArea.map((cell) => cell.getStatus());
  }

  loadSavedField(savedField) {
    this.playArea.forEach((cell, index) => cell.setStatus(savedField[index]));
  }
}
