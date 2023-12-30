import './mainView.css';
import View from '../View';
import KeyboardView from '../keyboard/KeyboardView';
import quizData from '../../data/quizData';

export default class MainView extends View {
  quiz = [];

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

    this.configureView();
    console.log(this.quiz[this.qNumber].a);
  }

  configureView() {
    this.addViewInside(this.keyboard);
    console.log(this.quiz);
  }

  shuffleArray(array) {
    this.quiz = array.sort(() => 0.5 - Math.random());
  }

  checkChar(char) {
    const isCorrect = this.quiz[this.qNumber].a
      .toLowerCase()
      .includes(char.toLowerCase());
    if (!isCorrect) {
      this.updateGameData();
    }
    return isCorrect;
  }

  updateGameData() {
    this.mistakes += 1;
    if (this.mistakes >= this.MAX_MISTAKES) {
      this.gameOver();
    }
  }

  gameOver() {
    console.log('game over');
  }
}
