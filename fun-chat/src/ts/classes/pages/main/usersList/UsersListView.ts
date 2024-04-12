import { UserPayload } from '../../../../types/UserPayload';
import { AllMessagesResponse } from '../../../../types/response/AllMessagesResponse';
import { MessageResponse } from '../../../../types/response/MessageResponse';
import { ResponsesList } from '../../../../types/response/ResponsesList';
import InputNodeCreator from '../../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/View';
import Controller from '../../../controller/Controller';
import UserItemView from './userItem/UserItemView';
import './usersListView.scss';

export default class UsersListView extends View {
  private onlineUsersNode = new NodeCreator({ tag: 'ul', css: ['users-list'] });

  private offlineUsersNode = new NodeCreator({ tag: 'ul', css: ['users-list'] });

  private usersCollection = new Map<string, UserItemView>();

  constructor(
    private readonly controller: Controller,
    private startDialog: (login: string, status: boolean) => void
  ) {
    super({ tag: 'div', css: ['users'] });
    this.render();
    this.state.subscribe(this.viewCreator, 'isWsActive', (v) => {
      if (v) {
        this.usersCollection.forEach((user) => user.remove());
        this.usersCollection = new Map<string, UserItemView>();
        this.getUsers('USER_ACTIVE');
        this.getUsers('USER_INACTIVE');
      }
    });
    this.state.subscribe(this.viewCreator, 'unhandledResponse', (data) => data && this.listenResponses(data));
  }

  private render() {
    const filter = new InputNodeCreator({ tag: 'input', type: 'text', css: ['users__filter'] });
    this.addNodeInside(filter, this.onlineUsersNode, this.offlineUsersNode);
  }

  private listenResponses(data: ResponsesList) {
    if (!data) return;
    if (data.type === 'USER_EXTERNAL_LOGIN' || data.type === 'USER_EXTERNAL_LOGOUT') {
      this.drawUsers(data.payload.user);
    }
  }

  private getUsers(type: 'USER_ACTIVE' | 'USER_INACTIVE') {
    this.controller.getUsers(type, (data) => {
      if (data.type === type) {
        this.drawUsers(...data.payload.users);
      }
    });
  }

  private drawUsers(...list: UserPayload[]) {
    const myLogin = this.state.getValue('appLogin');
    list.forEach((data) => {
      if (data.login === myLogin) return;
      if (!this.usersCollection.has(data.login)) {
        const user = new UserItemView(data, this.startDialog);
        this.usersCollection.set(data.login, user);
        this.controller.fetchMessageHistory<AllMessagesResponse>(data.login, (msg) => user.init(msg, myLogin!));
      }
      this.handleUserStatus(data);
    });
  }

  private handleUserStatus(userInfo: UserPayload) {
    const user = this.usersCollection.get(userInfo.login)!;
    if (userInfo.isLogined) {
      this.onlineUsersNode.addInnerNode(user.viewCreator);
    } else {
      this.offlineUsersNode.addInnerNode(user.viewCreator);
    }
    user.setStatus(userInfo.isLogined);
  }

  public showUnreadMsgCount(data: MessageResponse) {
    if (!this.usersCollection.has(data.payload.message.from)) return;
    this.usersCollection.get(data.payload.message.from)?.incrementMessage();
  }
}
