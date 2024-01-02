import './infoView.css';
import NodeCreator from '../../classes/NodeCreator';
import View from '../View';

const INCORRECT = 'Incorrect guesses: ';

export default class InfoView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['info'],
    });
    this.configureView();
  }

  configureView() {
    this.secretWord = new NodeCreator({
      tag: 'p',
      css: ['info__secret-word'],
    });
    this.question = new NodeCreator({
      tag: 'p',
      css: ['info__question'],
    });
    this.correctAnswers = new NodeCreator({
      tag: 'p',
      text: `${INCORRECT}0 / 6`,
    });
    this.viewNode.addInnerNode(
      this.correctAnswers,

      this.question,
      this.secretWord
    );
  }

  updateData(word, charList, question) {
    const hiddenWord = word
      .split('')
      .map((char) => (charList.includes(char.toUpperCase()) ? char : '_'))
      .join('');
    this.secretWord.setTextContent(hiddenWord);
    if (question) {
      this.question.setTextContent(`Hint: ${question}`);
    }
    if (!hiddenWord.includes('_')) {
      return true;
    }
    return false;
  }

  updateGuesses(mistakes) {
    this.correctAnswers.setTextContent(`${INCORRECT}${mistakes} / 6`);
  }
}
