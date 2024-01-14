import './keyboard.css';
import View from '../View';
import buttonsData from '../../data/buttonsData';
import ButtonView from './button/ButtonView';

export default class KeyboardView extends View {
  buttonList = new Map();

  isPlaying = true;

  constructor(checkChar) {
    super({
      tag: 'div',
      css: ['keyboard'],
    });
    this.configureView(checkChar);
    window.addEventListener('keydown', (e) => {
      if (!this.isPlaying) {
        return;
      }
      if (!buttonsData.includes(e.code.at(-1))) {
        return;
      }
      if (this.buttonList.get(e.code.at(-1)).pushed) {
        return;
      }
      const result = checkChar(e.code.at(-1));
      this.buttonList.get(e.code.at(-1)).setResultStyle(result);
    });
  }

  configureView(checkChar) {
    buttonsData.forEach((code) => {
      const btn = new ButtonView(code, checkChar);
      this.buttonList.set(code, btn);
    });
    this.addViewInside(...this.buttonList.values());
  }

  resetKeyboard() {
    this.buttonList.forEach((btn) => btn.resetButton());
  }

  blockKeyboard(bool) {
    this.isPlaying = bool;
  }
}
