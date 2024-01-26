import './PuzzleView.scss';
import View from '../../classes/View';
import FieldView from './field/FieldView';
import LeftBarView from './leftBar/LeftBarView';
import UpperBarView from './upperBar/UpperBarView';
import NodeCreator from '../../classes/NodeCreator';

const CSS_CLASSES = {
  puzzle: 'puzzle',
};

export default class PuzzleView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: [CSS_CLASSES.puzzle],
    };
    super(params);
    this.viewNode.setCallback((e) => e.preventDefault(), 'contextmenu');

    this.field = new FieldView();
    this.leftList = new LeftBarView();
    this.upperList = new UpperBarView();
    this.gameTitle = new NodeCreator({
      tag: 'p',
      text: '',
      css: ['puzzle__title'],
    });
    this.viewNode.addInnerNode(this.gameTitle);
    this.addViewInside(this.field, this.leftList, this.upperList);
  }

  generateGame(scheme, gameName, savedField) {
    this.viewNode.setClassNames([
      CSS_CLASSES.puzzle,
      `${CSS_CLASSES.puzzle}_${gameName}`,
      `${CSS_CLASSES.puzzle}_${scheme.length}`,
    ]);
    this.gameTitle.setTextContent(gameName);
    this.field.generateField(scheme, savedField);
    this.leftList.generateGame(scheme);
    this.upperList.generateGame(scheme);
  }

  resetGame() {
    this.field.resetGame();
  }

  showSolution() {
    this.field.showSolution();
  }

  saveGame() {
    return this.field.saveGame();
  }
}
