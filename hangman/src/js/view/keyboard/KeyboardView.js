import View from '../View';
import buttonsData from '../../data/buttonsData';
import ButtonView from './button/ButtonView';

export default class KeyboardView extends View {
  buttonList = [];

  constructor(checkMethod) {
    super({
      tag: 'div',
      css: ['keyboard'],
    });
    this.configureView(checkMethod);
    window.addEventListener('keydown', (e) => {
      console.log(e.code.at(-1));
    });
  }

  configureView(checkMethod) {
    buttonsData.forEach((code) => {
      const btn = new ButtonView(code, checkMethod);
      this.buttonList.push(btn);
    });
    this.addViewInside(...this.buttonList);
  }
}
