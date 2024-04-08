import InputNodeCreator from '../../../common/nodeCreator/InputNodeCreator';
import View from '../../../common/view/View';

export default class LoginNameView extends View {
  constructor() {
    super({ tag: 'div' });
    this.render();
  }

  private render() {
    const input = new InputNodeCreator({
      tag: 'input',
      css: ['login-input'],
      type: 'text',
      placeholder: `Enter your login`,
    });
    input.setCallback(() => {
      this.inputValidation(input.node.value);
    }, 'input');
    this.addNodeInside(input);
  }

  private inputValidation(text: string) {
    // if (!text.length) {
    //   this.state.next('appLogin', () => null);
    //   return;
    // }
    // if (text && !/^[a-zA-Z-^]+$/.test(text)) {
    //   this.state.next('appLogin', () => null);
    //   return;
    // }
    // if ((text && text[0] !== text[0].toUpperCase()) || text[0] === '-') {
    //   this.state.next('appLogin', () => null);
    //   return;
    // }
    // if (text && text.length < 5) {
    //   this.state.next('appLogin', () => null);
    //   return;
    // }
    if (text) this.state.next('appLogin', () => text);
  }
}
