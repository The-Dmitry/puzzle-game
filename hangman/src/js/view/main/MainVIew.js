import './mainView.css';
import View from '../View';
import KeyboardView from '../keyboard/KeyboardView';
import quizData from '../../data/quizData';
import GallowsView from '../gallows/GallowsView';
import InfoView from '../infoView/infoView';

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
    this.gallows = new GallowsView(this.correctChars);
    this.infoView = new InfoView();

    this.configureView();
    console.log(this.quiz[this.qNumber].a);
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
    if (this.mistakes >= this.MAX_MISTAKES) {
      this.showGameOver();
    }
  }

  showGameOver() {
    console.log('game over');
    // this.resetGame();
    // this.startNewGame();
  }

  showWin() {
    console.log('YOU WIN!');
  }

  show;

  resetGame() {
    this.mistakes = 0;
    this.correctChars = [];
    this.qNumber += 1;
    this.gallows.setBodyParts(0);
  }

  startNewGame() {
    this.resetGame();
    this.keyboard.resetKeyboard();
    // this.gallows.resetGallows();
    this.infoView.updateData(
      this.quiz[this.qNumber].a,
      this.correctChars,
      this.quiz[this.qNumber].q
    );
  }
}
