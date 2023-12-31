import View from '../View';
import buttonsData from '../../data/buttonsData';
import ButtonView from './button/ButtonView';

export default class KeyboardView extends View {
  buttonList = new Map();

  constructor(checkChar) {
    super({
      tag: 'div',
      css: ['keyboard'],
    });
    this.configureView(checkChar);
    window.addEventListener('keydown', (e) => {
      if (checkChar(e.code.at(-1))) {
      }
    });
  }

  configureView(checkChar) {
    buttonsData.forEach((code) => {
      const btn = new ButtonView(code, checkChar);
      this.buttonList.set(code, btn);
    });
    this.addViewInside(...this.buttonList.values());
  }

  resetKeyboard() {}
}
