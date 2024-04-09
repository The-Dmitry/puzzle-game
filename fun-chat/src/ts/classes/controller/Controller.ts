import SocketResponse from '../../interfaces/SocketResponse';
import { PayloadsTypes } from '../../types/PayloadTypes';
import State from '../common/state/State';

// const WS_URL = `wss://rs-chat-d66c4fe06a3a.herokuapp.com/`;
const WS_URL = `ws://127.0.0.1:4000`;

export default class Controller {
  private socket = new WebSocket(WS_URL);

  private callbackList = new Map();

  private state = State.getInstance();

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.socket.readyState > 1) {
      this.socket = new WebSocket(WS_URL);
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

  public authorization<T extends PayloadsTypes>(
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

  public getUsers<T extends PayloadsTypes>(
    id: string,
    type: 'USER_ACTIVE' | 'USER_INACTIVE',
    callback: (data: SocketResponse<T>) => void
  ) {
    this.setCallback(id, callback);
    const data = {
      id,
      type,
      payload: null,
    };
    this.socket.send(JSON.stringify(data));
  }

  private setCallback<T extends PayloadsTypes>(id: string, callback: (data: SocketResponse<T>) => void) {
    this.callbackList.set(id, callback);
  }

  private handleResponse<T extends PayloadsTypes>(data: SocketResponse<T>) {
    if (data.id && this.callbackList.has(data.id)) {
      this.callbackList.get(data.id)!(data);
      this.callbackList.delete(data.id);
      return;
    }
    this.state.next('unhandledResponse', () => data);
  }
}
