import './mainView.scss';
import View from '../../common/view/View';
import HeaderView from './header/HeaderView';
import Controller from '../../controller/Controller';
import { PayloadsTypes } from '../../../types/PayloadTypes';
import { Routes } from '../../common/router/Routes';

export default class MainView extends View {
  private userLogin = '';

  private userPassword = '';

  constructor(private readonly controller: Controller<PayloadsTypes>) {
    super({ tag: 'div', css: ['main'] });
    this.state.subscribe(this.viewCreator, 'appLogin', (login) => {
      this.userLogin = login ?? '';
    });
    this.state.subscribe(this.viewCreator, 'appPassword', (password) => {
      this.userPassword = password ?? '';
    });
    this.isAuthorized();
    this.render();
  }

  private render() {
    const header = new HeaderView(() => this.logout());
    this.addNodeInside(header);
  }

  private isAuthorized() {
    if (!(this.userLogin && this.userPassword)) {
      this.redirectToAuthorization();
    }
  }

  private redirectToAuthorization() {
    window.history.replaceState({}, '', Routes.AUTHORIZATION);
  }

  private logout() {
    this.controller.authorization('USER_LOGOUT', this.userLogin, this.userPassword, (data) => {
      console.log(data);
      if ('user' in data.payload) {
        if (!data.payload.user.isLogined) {
          this.redirectToAuthorization();
        }
      } else {
        console.log(data.payload.error);
      }
    });
  }
}
