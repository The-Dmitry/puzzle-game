import './noServerView.scss';
import View from '../common/view/View';

export default class NoServerView extends View {
  constructor() {
    super({ tag: 'div', css: ['no-server'], text: 'Server is unavailable' });
  }
}
