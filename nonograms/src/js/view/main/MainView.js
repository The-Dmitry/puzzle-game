import './MainView.scss';
import View from '../../classes/View';
import PuzzleView from '../puzzle/PuzzleView';
import gameData from '../../data/game-data';

export default class MainView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['main'],
    };
    super(params);
    this.puzzle = new PuzzleView();
    this.configureView();
  }

  configureView() {
    this.addViewInside(this.puzzle);
    this.generateGame();
  }

  generateGame() {
    this.puzzle.generateGame(gameData[0]);
  }
}
