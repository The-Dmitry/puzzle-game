import './MainView.scss';
import './greeting/greeting.scss';
import View from '../../classes/View';
import PuzzleView from '../puzzle/PuzzleView';
import gameData from '../../data/game-data';
import NewGameView from './newGameView/NewGameView';
import NodeCreator from '../../classes/NodeCreator';
import TimerView from './timer/TimerView';
import Observer from '../../classes/observer/Observer';
import GreetingView from './greeting/GreetingView';
import ObserverActions from '../../classes/observer/observerActions';

export default class MainView extends View {
  gameName;

  fieldSize = 0;

  #observer = Observer.getInstance();

  constructor() {
    const params = {
      tag: 'div',
      css: ['main'],
    };
    super(params);
    this.newGame = new NewGameView(gameData, this.generateGame.bind(this));
    this.puzzle = new PuzzleView(this.showVictory.bind(this));
    this.timer = new TimerView();
    this.controls = this.createControls();
    this.configureView();
    this.#observer.subscribe(ObserverActions.victory, () => this.showVictory());
  }

  configureView() {
    // this.addViewInside(this.newGame);
    this.generateGame(gameData.five.chicken, 'chicken');
  }

  generateGame(scheme, gameName, savedField = null) {
    this.fieldSize = scheme.length;
    this.gameName = gameName;
    this.puzzle.generateGame(scheme, gameName, savedField);
    this.newGame.viewNode.removeNode();
    this.viewNode.addInnerNode(this.controls);
    this.addViewInside(this.puzzle, this.timer);
  }

  pickNewGame() {
    this.puzzle.getElement().remove();
    this.timer.getElement().remove();
    this.controls.removeNode();
    this.addViewInside(this.newGame);
  }

  saveGame() {
    const game = {
      field: this.puzzle.saveGame(),
      gameName: this.gameName,
      time: this.timer.getSeconds,
    };
    localStorage.setItem('saved-game', JSON.stringify(game));
  }

  loadGame() {
    const game = JSON.parse(localStorage.getItem('saved-game')) || null;
    const scheme = Object.values(gameData);
    const data = scheme.find((diff) => diff[game.gameName])[game.gameName];
    this.generateGame(data, game.gameName, game.field);
    this.timer.stopTimer();
    this.timer.setSeconds = game.time;
  }

  createControls() {
    let saveGameContext;
    const loadGame = new NodeCreator({
      tag: 'button',
      text: 'load game',
      css: ['1'],
      callback: () => {
        this.loadGame();
        saveGameContext.getNode().disabled = false;
      },
    });
    if (!localStorage.getItem('saved-game')) {
      loadGame.getNode().disabled = true;
    }
    const saveGame = new NodeCreator({
      tag: 'button',
      text: 'save game',
      css: ['1'],
      callback: () => {
        this.saveGame();
        loadGame.getNode().disabled = false;
      },
    });
    saveGameContext = saveGame;
    const resetGame = new NodeCreator({
      tag: 'button',
      text: 'reset',
      css: ['1'],
      callback: () => {
        this.puzzle.resetGame();
        this.timer.stopTimer();
        this.timer.setSeconds = 0;
        saveGame.getNode().disabled = false;
      },
    });
    const newGame = new NodeCreator({
      tag: 'button',
      text: 'new game',
      css: ['1'],
      callback: () => {
        this.pickNewGame();
        this.timer.stopTimer();
        this.timer.setSeconds = 0;
        saveGame.getNode().disabled = false;
      },
    });
    const solution = new NodeCreator({
      tag: 'button',
      text: 'show solution',
      css: ['1'],
      callback: () => {
        saveGame.getNode().disabled = true;
        this.puzzle.showSolution();
        this.#observer.dispatch(ObserverActions.stopGame);
      },
    });
    this.#observer.subscribe(ObserverActions.victory, () => {
      saveGame.getNode().disabled = true;
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

  showVictory() {
    const greetingModal = new GreetingView(
      this.gameName,
      this.fieldSize,
      this.timer.getSeconds
    );
    this.timer.stopTimer();
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
