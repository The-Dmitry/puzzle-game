import './userItemView.scss';
import View from '../../../../common/view/View';
import { UserPayload } from '../../../../../types/UserPayload';
import NodeCreator from '../../../../common/nodeCreator/NodeCreator';
import { AllMessagesResponse } from '../../../../../types/response/AllMessagesResponse';

export default class UserItemView extends View {
  private status = false;

  private unreadMessages = 0;

  private messagesCounter = new NodeCreator({ tag: 'div', css: ['users-item__counter'], text: '1' });

  private isCounterInserted = false;

  constructor({ login, isLogined }: UserPayload, startDialog: (login: string, status: boolean) => void) {
    super({ tag: 'li', css: ['users-item'], text: login, callback: () => startDialog(login, this.status) });
    this.setStatus(isLogined);
    this.state.subscribe(this.viewCreator, 'onReadMessage', (name) => name === login && this.resetCounter(), false);
  }

  public init(data: AllMessagesResponse, myLogin: string) {
    if (data && data.type === 'MSG_FROM_USER') {
      const count = data.payload.messages.filter((msg) => !msg.status.isReaded && msg.to === myLogin).length;
      if (count > 0) {
        this.unreadMessages = count - 1;
        this.incrementMessage();
      }
    }
  }

  public setStatus(isLogined: boolean) {
    this.status = isLogined;
    this.viewCreator.removeCLassName(`${isLogined ? 'users-item_offline' : 'users-item_online'}`);
    this.viewCreator.addClassName(`${isLogined ? 'users-item_online' : 'users-item_offline'}`);
  }

  public incrementMessage() {
    this.unreadMessages += 1;
    this.messagesCounter.setTextContent(`${this.unreadMessages}`);
    if (!this.isCounterInserted) {
      this.isCounterInserted = true;
      this.viewCreator.node.append(this.messagesCounter.node);
    }
  }

  private resetCounter() {
    this.unreadMessages = 0;
    this.isCounterInserted = false;
    this.messagesCounter.node.remove();
  }
}
