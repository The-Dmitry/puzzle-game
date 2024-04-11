import './userItemView.scss';
import View from '../../../../common/view/View';
import { UserPayload } from '../../../../../types/UserPayload';

export default class UserItemView extends View {
  private status = false;

  constructor({ login, isLogined }: UserPayload, startDialog: (login: string, status: boolean) => void) {
    super({ tag: 'li', css: ['users-item'], text: login, callback: () => startDialog(login, this.status) });
    this.setStatus(isLogined);
    this.render();
  }

  private render() {}

  public setStatus(isLogined: boolean) {
    this.status = isLogined;
    this.viewCreator.removeCLassName(`${isLogined ? 'users-item_offline' : 'users-item_online'}`);
    this.viewCreator.addClassName(`${isLogined ? 'users-item_online' : 'users-item_offline'}`);
  }
}
