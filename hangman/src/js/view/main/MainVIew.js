import './mainView.css';
import View from '../View';
import KeyboardView from '../keyboard/KeyboardView';
import quizData from '../../data/quizData';

export default class MainView extends View {
  quiz = [];

  qNumber = 0;

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
    window.addEventListener('keydown', (e) => console.log(e.code));
  }

  shuffleArray(array) {
    this.quiz = array.sort(() => 0.5 - Math.random());
  }

  checkChar(char) {
    const isCorrect = this.quiz[this.qNumber].a.includes(char);
    return isCorrect;
  }
}
