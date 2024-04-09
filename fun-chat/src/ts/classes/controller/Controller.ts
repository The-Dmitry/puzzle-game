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
      this.state.next('isWsActive', () => true);
    };
    this.socket.onclose = () => {
      this.state.next('isWsActive', () => false);
      this.reconnect();
    };
    this.socket.onmessage = (e) => {
      const result = JSON.parse(e.data);
      this.handleResponse(result);
    };
  }

  private reconnect() {
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  public authorization<T extends PayloadsTypes>(
    type: 'USER_LOGOUT' | 'USER_LOGIN',
    login: string,
    password: string,
    callback: (data: SocketResponse<T>) => void
  ) {
    const id = `${type}${Date.now()}`;
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
    type: 'USER_ACTIVE' | 'USER_INACTIVE',
    callback: (data: SocketResponse<T>) => void
  ) {
    const id = `${type}${Date.now()}`;
    this.setCallback(id, callback);
    const data = {
      id,
      type,
      payload: null,
    };
    this.socket.send(JSON.stringify(data));
  }

  public sendMessage(to: string, text: string) {
    this.socket.send(
      JSON.stringify({
        id: `"MSG_SEND"${Date.now()}`,
        type: 'MSG_SEND',
        payload: {
          message: {
            to,
            text,
          },
        },
      })
    );
  }

  // public fetchMessageHistory(login: string, type: '') {
  //   const id = `${type}${Date.now()}`;
  //   const data = {
  //     id: string,
  //     type: "MSG_FROM_USER",
  //     payload: {
  //       user: {
  //         login: string,
  //       }
  //     }
  //   }
  // }

  private setCallback<T extends PayloadsTypes>(id: string, callback: (data: SocketResponse<T>) => void) {
    this.callbackList.set(id, callback);
  }

  private handleResponse<T extends PayloadsTypes>(data: SocketResponse<T>) {
    if (data.id && this.callbackList.has(data.id)) {
      this.callbackList.get(data.id)!(data);
      this.callbackList.delete(data.id);
      return;
    }
    // console.log('unhandled');

    this.state.next('unhandledResponse', () => data);
  }
}
