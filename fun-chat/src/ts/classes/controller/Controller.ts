import { ResponsesList } from '../../types/response/ResponsesList';
import State from '../common/state/State';

// const WS_URL = `wss://rs-chat-d66c4fe06a3a.herokuapp.com/`;
const WS_URL = `ws://127.0.0.1:4000`;

export default class Controller {
  private socket = new WebSocket(WS_URL);

  private callbackList = new Map();

  private state = State.getInstance();

  constructor() {
    this.state.next('isWsActive', () => false);
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

  public authorization<T extends ResponsesList>(
    type: 'USER_LOGOUT' | 'USER_LOGIN',
    login: string,
    password: string,
    callback: (data: T) => void
  ) {
    const id = `${type}${crypto.randomUUID()}`;
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

  public getUsers<T extends ResponsesList>(type: 'USER_ACTIVE' | 'USER_INACTIVE', callback: (data: T) => void) {
    const id = `${type}${crypto.randomUUID()}`;
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

  public fetchMessageHistory<T extends ResponsesList>(login: string, callback: (data: T) => void) {
    const id = `"MSG_FROM_USER"${crypto.randomUUID()}`;
    const data = {
      id,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login,
        },
      },
    };
    this.setCallback(id, callback);
    this.socket.send(JSON.stringify(data));
  }

  public setReadStatus(id: string) {
    this.socket.send(
      JSON.stringify({
        id,
        type: 'MSG_READ',
        payload: {
          message: {
            id,
          },
        },
      })
    );
  }

  public deleteMessage(id: string) {
    this.socket.send(
      JSON.stringify({
        id: 'string',
        type: 'MSG_DELETE',
        payload: {
          message: {
            id,
          },
        },
      })
    );
  }

  private setCallback<T extends ResponsesList>(id: string, callback: (data: T) => void) {
    this.callbackList.set(id, callback);
  }

  private handleResponse<T extends ResponsesList>(data: T) {
    if (data.id && this.callbackList.has(data.id)) {
      this.callbackList.get(data.id)!(data);
      this.callbackList.delete(data.id);
      return;
    }
    this.state.next('unhandledResponse', () => data);
  }
}
