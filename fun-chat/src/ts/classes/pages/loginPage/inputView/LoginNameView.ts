import LoginInputView from './LoginInputView';

export default class LoginNameView extends LoginInputView {
  constructor(isValid: () => void) {
    super();
    this.input.setPlaceholder(`Login...`);
    this.input.setCallback(() => {
      this.inputValidation(this.input.node.value);
      isValid();
    }, 'input');
    this.input.setCallback((e) => {
      if (!(e instanceof KeyboardEvent)) return;
      if (e instanceof KeyboardEvent && ['NumpadEnter', 'Enter'].includes(e.code)) {
        this.state.next('loginByEnter', (v) => !v);
      }
    }, 'keydown');
  }

  private inputValidation(text: string) {
    this.notice.setTextContent(' ');
    if (!text.length) {
      this.notice.setTextContent(' ');
      this.value = null;
      return;
    }
    if (text && !/^[a-zA-Z0-9\s]+$/.test(text)) {
      this.notice.setTextContent('Use only English letters and numbers');
      this.value = null;
      return;
    }
    if ((text && text[0] !== text[0].toUpperCase()) || text[0] === ' ') {
      this.notice.setTextContent('The first letter must be uppercase');
      this.value = null;
      return;
    }
    if (text && text.length < 4) {
      this.notice.setTextContent(`Login must be at least 4 characters`);
      this.value = null;
      return;
    }
    if (text) this.value = text;
  }
}
