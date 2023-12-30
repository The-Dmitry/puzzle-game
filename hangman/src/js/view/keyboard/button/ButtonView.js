import View from '../../View';

export default class ButtonView extends View {
  constructor(code, checkMethod) {
    super({
      tag: 'button',
      css: ['keyboard__button'],
      text: code,
      callback: () => {
        this.setResultStyle(checkMethod(code));
      },
    });
  }

  setResultStyle(isAnswerCorrect) {
    this.getElement().style.backgroundColor = isAnswerCorrect ? 'green' : 'red';
  }
}
