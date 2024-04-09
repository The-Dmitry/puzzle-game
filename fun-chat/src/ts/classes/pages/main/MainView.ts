import './mainView.scss';
import View from '../../common/view/View';
import HeaderView from './header/HeaderView';
import Controller from '../../controller/Controller';
import { Routes } from '../../common/router/Routes';
import UsersListView from './usersList/UsersListView';
import SocketResponse from '../../../interfaces/SocketResponse';
import { PayloadUser, UsersListPayload } from '../../../types/UsersListPayload';
import UserItemView from './usersList/userItem/UserItemView';

export default class MainView extends View {
  private userList = new UsersListView();

  constructor(private readonly controller: Controller) {
    super({ tag: 'div', css: ['main'] });
    if (!this.state.getValue('appLogin')) {
      window.history.replaceState({}, '', Routes.AUTHORIZATION);
    }
    this.render();
    this.state.subscribe(this.viewCreator, 'isWsActive', (v) => {
      if (v) {
        this.getUsers('USER_ACTIVE');
        this.getUsers('USER_INACTIVE');
      }
    });
  }

  private render() {
    const header = new HeaderView();
    this.addNodeInside(header, this.userList);
  }

  private getUsers(type: 'USER_ACTIVE' | 'USER_INACTIVE') {
    this.controller.getUsers(`${type}${Date.now()}`, type, (data: SocketResponse<UsersListPayload>) => {
      if ('users' in data.payload) {
        this.drawUsers(data.payload.users);
      }
      console.log(data);
    });
  }

  private drawUsers(list: PayloadUser[]) {
    list.forEach((data) => {
      const user = new UserItemView(data);
      this.userList.addNodeInside(user);
    });
  }
}
