import View from '../../View';

export default class ButtonView extends View {
  pushed = false;

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
    if (this.pushed) {
      return;
    }
    this.pushed = true;
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
    this.pushed = false;
    this.viewNode.setClassNames(['keyboard__button']);
    this.viewNode.getNode().disabled = false;
  }
}
