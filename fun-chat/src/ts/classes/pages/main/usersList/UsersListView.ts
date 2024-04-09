import SocketResponse from '../../../../interfaces/SocketResponse';
import { PayloadsTypes } from '../../../../types/PayloadTypes';
import { PayloadUser, UsersListPayload } from '../../../../types/UsersListPayload';
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
    private startDialog: (login: string) => void
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

  private listenResponses(data: SocketResponse<PayloadsTypes>) {
    if (!('user' in data.payload)) return;
    if (data.type === 'USER_EXTERNAL_LOGIN' || data.type === 'USER_EXTERNAL_LOGOUT') {
      this.drawUsers(data.payload.user);
    }
  }

  private getUsers(type: 'USER_ACTIVE' | 'USER_INACTIVE') {
    this.controller.getUsers(type, (data: SocketResponse<UsersListPayload>) => {
      if ('users' in data.payload) {
        this.drawUsers(...data.payload.users);
      }
    });
  }

  private drawUsers(...list: PayloadUser[]) {
    list.forEach((data) => {
      if (!this.usersCollection.has(data.login)) {
        const user = new UserItemView(data, this.startDialog);
        this.usersCollection.set(data.login, user);
      }
      this.handleUserStatus(data);
    });
  }

  private handleUserStatus(userInfo: PayloadUser) {
    const user = this.usersCollection.get(userInfo.login)!;
    if (userInfo.isLogined) {
      this.onlineUsersNode.addInnerNode(user.viewCreator);
    } else {
      this.offlineUsersNode.addInnerNode(user.viewCreator);
    }
    user.setStatus(userInfo.isLogined);
  }
}
