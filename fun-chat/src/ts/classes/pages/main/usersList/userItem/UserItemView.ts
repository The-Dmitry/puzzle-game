import './userItemView.scss';
import { PayloadUser } from '../../../../../types/UsersListPayload';
import View from '../../../../common/view/View';

export default class UserItemView extends View {
  constructor({ login, isLogined }: PayloadUser, startDialog: (login: string) => void) {
    super({ tag: 'li', css: ['users-item'], text: login, callback: () => startDialog(login) });
    this.setStatus(isLogined);
    this.render();
  }

  private render() {}

  public setStatus(isLogined: boolean) {
    this.viewCreator.removeCLassName(`${isLogined ? 'users-item_offline' : 'users-item_online'}`);
    this.viewCreator.addClassName(`${isLogined ? 'users-item_online' : 'users-item_offline'}`);
  }
}
