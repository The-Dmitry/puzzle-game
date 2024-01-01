import NodeCreator from '../../classes/NodeCreator';
import View from '../View';

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
    });
    this.question = new NodeCreator({
      tag: 'p',
    });
    this.viewNode.addInnerNode(this.secretWord, this.question);
  }

  updateData(word, charList, question) {
    const hiddenWord = word
      .split('')
      .map((char) => (charList.includes(char.toUpperCase()) ? char : '_'))
      .join('');
    this.secretWord.setTextContent(hiddenWord);
    if (question) {
      this.question.setTextContent(question);
    }
    if (!hiddenWord.includes('_')) {
      return true;
    }
    return false;
  }
}
