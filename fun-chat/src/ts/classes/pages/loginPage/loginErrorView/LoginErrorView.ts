import View from '../../../common/view/View';
import LoginErrorItemView from './LoginErrorItemView';
import './loginErrorView.scss';

export default class LoginErrorView extends View {
  constructor() {
    super({ tag: 'ul', css: ['login-error'] });
  }

  public showError(text: string) {
    this.addNodeInside(new LoginErrorItemView(text));
  }
}
