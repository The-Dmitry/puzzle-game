import './mainView.scss';
import View from '../../common/view/View';
import HeaderView from './header/HeaderView';
import Controller from '../../controller/Controller';
import { PayloadsTypes } from '../../../types/PayloadTypes';
import { Routes } from '../../common/router/Routes';
import UsersListView from './usersList/UsersListView';

export default class MainView extends View {
  constructor(private readonly controller: Controller<PayloadsTypes>) {
    super({ tag: 'div', css: ['main'] });
    if (!this.state.getValue('appLogin')) {
      window.history.replaceState({}, '', Routes.AUTHORIZATION);
    }
    this.render();
    this.state.subscribe(this.viewCreator, 'isWsActive', (v) => {
      if (v) {
        this.getUsers();
      }
    });
  }

  private render() {
    const header = new HeaderView();
    const userList = new UsersListView();
    this.addNodeInside(header, userList);
  }

  private getUsers() {
    this.controller.getUsers(`users${Date.now()}`, 'USER_ACTIVE', (data) => {
      console.log(data);
    });
  }
}
