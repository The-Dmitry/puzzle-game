import './userItemView.scss';
import { PayloadUser } from '../../../../../types/UsersListPayload';
import View from '../../../../common/view/View';

export default class UserItemView extends View {
  constructor({ login, isLogined }: PayloadUser) {
    super({ tag: 'li', css: ['users-item', `${isLogined ? 'users-item_online' : 'users-item_offline'}`], text: login });
    this.render();
  }

  private render() {}
}
