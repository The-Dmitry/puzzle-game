import './MainView.scss';
import View from '../../classes/View';
import PuzzleView from '../puzzle/PuzzleView';
import gameData from '../../data/game-data';
import SettingsView from './settingsView/SettingsView';
import NewGameView from './newGameView/NewGameView';

export default class MainView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['main'],
    };
    super(params);
    this.settings = new SettingsView();
    this.newGame = new NewGameView(gameData, this.generateGame.bind(this));
    this.puzzle = new PuzzleView();
    this.configureView();
  }

  configureView() {
    // this.addViewInside(this.settings, this.puzzle);
    this.addViewInside(this.settings, this.newGame);
    // this.generateGame();
  }

  generateGame(scheme, gameName) {
    this.puzzle.generateGame(scheme, gameName);
    this.newGame.viewNode.removeNode();
    this.addViewInside(this.puzzle);
  }
}
