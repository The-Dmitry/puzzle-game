import LoginInputView from './LoginInputView';

export default class LoginPasswordView extends LoginInputView {
  constructor(isValid: () => void) {
    super();
    this.input.node.type = 'password';
    this.input.setPlaceholder(`Password...`);

    this.input.setCallback(() => {
      this.input.node.value = this.input.node.value.replace(' ', '');
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
    if (text && text.length < 4) {
      this.notice.setTextContent(`Password must be at least 4 characters`);
      this.value = null;
      return;
    }
    if (text && !/^[a-zA-Z0-9]+$/.test(text)) {
      this.notice.setTextContent('Use only English letters and numbers');
      this.value = null;
      return;
    }
    if (text && !/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]+$/.test(text)) {
      this.notice.setTextContent('At least one character must be uppercase');
      this.value = null;
      return;
    }
    if (text && !/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(text)) {
      this.notice.setTextContent('The password must consist of letters and numbers');
      this.value = null;
      return;
    }
    if (text) this.value = text;
  }
}
