import SocketResponse from '../../interfaces/SocketResponse';
import { PayloadsTypes } from '../../types/PayloadTypes';
import State from '../common/state/State';

export default class Controller<T extends PayloadsTypes> {
  private socket = new WebSocket(`ws://127.0.0.1:4000`);

  private callbackList = new Map<string, (data: SocketResponse<T>) => void>();

  private state = State.getInstance();

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.socket.readyState > 1) {
      this.socket = new WebSocket(`ws://127.0.0.1:4000`);
    }
    this.socket.onopen = () => {
      // console.log('SOCKET OPENED');
      this.state.next('isWsActive', () => true);
    };
    this.socket.onclose = () => {
      // console.log('SOCKET CLOSED');
      this.state.next('isWsActive', () => false);
      this.reconnect();
    };
    this.socket.onmessage = (e) => this.handleResponse(JSON.parse(e.data));
  }

  public reconnect() {
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  public authorization(
    id: string,
    type: 'USER_LOGOUT' | 'USER_LOGIN',
    login: string,
    password: string,
    callback: (data: SocketResponse<T>) => void
  ) {
    this.setCallback(id, callback);
    const data = {
      id,
      type,
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    this.socket.send(JSON.stringify(data));
  }

  public getUsers(id: string, type: 'USER_ACTIVE' | 'USER_INACTIVE', callback: (data: SocketResponse<T>) => void) {
    this.setCallback(id, callback);
    const data = {
      id,
      type,
      payload: null,
    };
    this.socket.send(JSON.stringify(data));
  }

  private setCallback(id: string, callback: (data: SocketResponse<T>) => void) {
    this.callbackList.set(id, callback);
  }

  private handleResponse(data: SocketResponse<T>) {
    if (data.id && this.callbackList.has(data.id)) {
      this.callbackList.get(data.id)!(data);
      this.callbackList.delete(data.id);
      return;
    }
    this.state.next('unhandledResponse', () => data);
  }
}
