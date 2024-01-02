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
    this.viewNode.addClassName(
      `${
        isAnswerCorrect
          ? 'keyboard__button_correct'
          : 'keyboard__button_incorrect'
      }`
    );
    this.viewNode.getNode().disabled = true;
    // this.getElement().style.backgroundColor = isAnswerCorrect ? 'green' : 'red';
  }

  resetButton() {
    this.viewNode.setClassNames(['keyboard__button']);
    this.viewNode.getNode().disabled = false;
  }
}
