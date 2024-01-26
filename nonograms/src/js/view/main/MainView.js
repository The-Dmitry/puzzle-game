import './MainView.scss';
import View from '../../classes/View';
import PuzzleView from '../puzzle/PuzzleView';
import gameData from '../../data/game-data';
import NewGameView from './newGameView/NewGameView';
import NodeCreator from '../../classes/NodeCreator';

export default class MainView extends View {
  gameName;

  constructor() {
    const params = {
      tag: 'div',
      css: ['main'],
    };
    super(params);
    this.newGame = new NewGameView(gameData, this.generateGame.bind(this));
    this.puzzle = new PuzzleView();
    this.controls = this.createControls();
    this.configureView();
  }

  configureView() {
    // this.addViewInside(this.settings, this.puzzle);
    this.addViewInside(this.newGame);
    // this.generateGame();
  }

  generateGame(scheme, gameName, savedField = null) {
    this.gameName = gameName;
    this.puzzle.generateGame(scheme, gameName, savedField);
    this.newGame.viewNode.removeNode();
    this.viewNode.addInnerNode(this.controls);
    this.addViewInside(this.puzzle);
  }

  pickNewGame() {
    this.puzzle.getElement().remove();
    this.controls.removeNode();
    this.addViewInside(this.newGame);
  }

  saveGame() {
    const game = {
      field: this.puzzle.saveGame(),
      gameName: this.gameName,
    };
    localStorage.setItem('saved-game', JSON.stringify(game));
  }

  loadGame() {
    const game = JSON.parse(localStorage.getItem('saved-game')) || null;
    console.log(game);
    const scheme = Object.values(gameData);
    const data = scheme.find((diff) => diff[game.gameName])[game.gameName];
    this.generateGame(data, game.gameName, game.field);
    console.log(data);
  }

  createControls() {
    const newGame = new NodeCreator({
      tag: 'button',
      text: 'new game',
      css: ['1'],
      callback: () => this.pickNewGame(),
    });
    const resetGame = new NodeCreator({
      tag: 'button',
      text: 'reset',
      css: ['1'],
      callback: () => this.puzzle.resetGame(),
    });

    const saveGame = new NodeCreator({
      tag: 'button',
      text: 'save game',
      css: ['1'],
      callback: () => this.saveGame(),
    });
    const loadGame = new NodeCreator({
      tag: 'button',
      text: 'load game',
      css: ['1'],
      callback: () => this.loadGame(),
    });
    const solution = new NodeCreator({
      tag: 'button',
      text: 'show solution',
      css: ['1'],
      callback: () => this.puzzle.showSolution(),
    });
    const controlsContainer = new NodeCreator({
      tag: 'div',
      css: ['controls'],
    });
    controlsContainer.addInnerNode(
      newGame,
      resetGame,
      saveGame,
      loadGame,
      solution
    );
    return controlsContainer;
  }
}

/* 
new game    best results


random


reset game
save game
load game
show solution
stopwatch

*/
