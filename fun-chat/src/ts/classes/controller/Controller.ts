import SocketResponse from '../../interfaces/SocketResponse';
import { PayloadsTypes } from '../../types/PayloadTypes';
import State from '../common/state/State';

export default class Controller<T extends PayloadsTypes> {
  private socket = new WebSocket(`ws://127.0.0.1:4000`);

  private callbackList = new Map<string, (data: SocketResponse<T>) => void>();

  private state = State.getInstance();

  constructor() {
    this.socket.onopen = (e) => console.log(e);
    this.socket.onmessage = (e) => this.handleResponse(JSON.parse(e.data));
  }

  public authorization(
    type: 'USER_LOGOUT' | 'USER_LOGIN',
    login: string,
    password: string,
    callback: (data: SocketResponse<T>) => void
  ) {
    const id = `${Date.now()}`;
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
