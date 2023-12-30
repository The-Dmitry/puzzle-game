import View from '../../View';

export default class ButtonView extends View {
  constructor(code, checkMethod) {
    super({
      tag: 'button',
      css: ['keyboard__button'],
      text: code,
      callback: () => {
        this.getElement().style.backgroundColor = checkMethod(code)
          ? 'green'
          : 'red';
      },
    });
  }
}
