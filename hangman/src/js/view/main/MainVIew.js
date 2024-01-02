import './mainView.css';
import View from '../View';
import KeyboardView from '../keyboard/KeyboardView';
import quizData from '../../data/quizData';
import GallowsView from '../gallows/GallowsView';
import InfoView from '../infoView/infoView';
import NodeCreator from '../../classes/NodeCreator';

const MESSAGE_FOR_PLAYER = {
  loose: 'GAME OVER',
  win: 'You did it!',
};

export default class MainView extends View {
  quiz = [];

  correctChars = [];

  qNumber = 0;

  MAX_MISTAKES = 6;

  mistakes = 0;

  constructor() {
    super({
      tag: 'div',
      css: ['main'],
    });
    this.shuffleArray(quizData);
    this.keyboard = new KeyboardView(this.checkChar.bind(this));
    this.gallows = new GallowsView();
    this.infoView = new InfoView();

    this.configureView();
  }

  configureView() {
    this.addViewInside(this.keyboard, this.gallows, this.infoView);
    this.startNewGame();
  }

  shuffleArray(array) {
    this.quiz = array.sort(() => 0.5 - Math.random());
  }

  checkChar(char) {
    const isCorrect = this.quiz[this.qNumber].a
      .toLowerCase()
      .includes(char.toLowerCase());
    if (!isCorrect) {
      this.updateMistakes();
    } else {
      this.correctChars.push(char);
      const result = this.infoView.updateData(
        this.quiz[this.qNumber].a,
        this.correctChars
      );
      if (result) {
        this.showWin();
      }
    }
    return isCorrect;
  }

  updateMistakes() {
    this.mistakes += 1;
    this.gallows.setBodyParts(this.mistakes);
    this.infoView.updateGuesses(this.mistakes);
    if (this.mistakes >= this.MAX_MISTAKES) {
      this.showGameOver();
    }
  }

  showGameOver() {
    const modal = this.createModal(MESSAGE_FOR_PLAYER.loose);
    this.blockAllView(true);
    this.showModal(modal);
  }

  showWin() {
    const modal = this.createModal(MESSAGE_FOR_PLAYER.win);
    this.blockAllView(true);
    this.showModal(modal);
  }

  show;

  resetGame() {
    this.mistakes = 0;
    this.correctChars = [];
  }

  startNewGame() {
    this.resetGame();
    this.qNumber += 1;
    if (this.qNumber >= quizData.length) {
      this.qNumber = 0;
    }
    this.gallows.setBodyParts(0);
    this.keyboard.resetKeyboard();
    this.infoView.updateData(
      this.quiz[this.qNumber].a,
      this.correctChars,
      this.quiz[this.qNumber].q
    );
    this.infoView.updateGuesses(0);
  }

  blockAllView(boolean) {
    [this.keyboard, this.gallows, this.infoView].forEach((view) =>
      view.blockView(boolean)
    );
  }

  createModal(text) {
    const message = new NodeCreator({
      tag: 'p',
      text: `${text}`,
    });
    const word = new NodeCreator({
      tag: 'p',
      text: `The correct word is ${this.quiz[this.qNumber].a.toUpperCase()}`,
    });
    const playAgainBtn = new NodeCreator({
      tag: 'button',
      text: 'Play again',
      callback: () => {
        this.closeModal();
        this.startNewGame();
        this.blockAllView(false);
      },
    });
    return [message, word, playAgainBtn];
  }
}
