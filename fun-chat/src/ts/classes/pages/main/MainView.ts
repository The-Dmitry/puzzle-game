import './mainView.scss';
import View from '../../common/view/View';
import HeaderView from './header/HeaderView';
import Controller from '../../controller/Controller';
import { Routes } from '../../common/router/Routes';
import UsersListView from './usersList/UsersListView';
import UserMessagesView from './userMessages/UserMessagesView';

export default class MainView extends View {
  private userList!: UsersListView;

  private messagesView!: UserMessagesView;

  private dialogWithUser = '';

  constructor(private readonly controller: Controller) {
    super({ tag: 'div', css: ['main'] });
    if (this.state.getValue('appLogin')) {
      this.userList = new UsersListView(this.controller, (login: string, status: boolean) =>
        this.startNewDialog(login, status)
      );
      this.messagesView = new UserMessagesView(this.controller);
      this.render();
      this.listenToNewMessages();
    } else {
      window.history.replaceState({}, '', Routes.AUTHORIZATION);
    }
  }

  private render() {
    const header = new HeaderView();
    this.addNodeInside(header, this.userList, this.messagesView);
  }

  private startNewDialog(targetLogin: string, status: boolean) {
    this.dialogWithUser = targetLogin;
    this.messagesView.startNewDialog(targetLogin, status);
  }

  private listenToNewMessages() {
    this.state.subscribe(this.viewCreator, 'unhandledResponse', (data) => {
      if (!(data && data.type === 'MSG_SEND')) return;
      // console.log(data);
      if (!('message' in data.payload)) return;
      const { from, to } = data.payload.message;
      if (from === this.dialogWithUser || to === this.dialogWithUser) {
        this.messagesView.handleNewMessage(data.payload);
      }
    });
  }
}
