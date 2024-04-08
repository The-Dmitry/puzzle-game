import View from '../../../../common/view/View';
import './userItemView.scss';

export default class UserItemView extends View {
  constructor() {
    super({ tag: 'div', css: ['users-item'] });
    this.render();
  }

  private render() {}
}
