import './dialogView.scss';
import View from '../../../../../common/view/View';
import Controller from '../../../../../controller/Controller';
import DialogItemView from './messageItem/DialogItemView';
import NodeCreator from '../../../../../common/nodeCreator/NodeCreator';
import SeparatorView from './separator/SeparatorView';
import { AllMessagesResponse } from '../../../../../../types/response/AllMessagesResponse';
import { MessagePayload } from '../../../../../../types/MessagePayload';

export default class DialogView extends View {
  private placeholder = new NodeCreator({
    tag: 'li',
    css: ['dialog__empty-notification'],
    text: 'Send your first message',
  });

  private separator = new SeparatorView();

  private isSeparatorInserted = false;

  private messagesList = new Map<string, DialogItemView>();

  private unreadMessages: string[] = [];

  constructor(
    private readonly controller: Controller,
    private readonly targetLogin: string
  ) {
    super({ tag: 'ul', css: ['dialog'], callback: () => this.readAllMessages() });
    this.getMessageHistory();
  }

  public handleNewMessage(message: MessagePayload) {
    if (!message.status.isReaded && message.from === this.targetLogin) {
      this.addSeparator();
    }
    this.placeholder.remove();
    const dialogItem = new DialogItemView(message, this.targetLogin, this.controller, () => this.readAllMessages());
    this.messagesList.set(message.id, dialogItem);
    if (!message.status.isReaded && message.from === this.targetLogin) {
      this.unreadMessages.push(message.id);
    }
    this.addNodeInside(dialogItem);
    this.scroll(this.isSeparatorInserted);
  }

  private render() {
    if (this.messagesList.size > 0) return;
    this.addNodeInside(this.placeholder);
  }

  private scroll(toSeparator: boolean) {
    if (toSeparator) {
      this.separator.viewCreator.node.scrollIntoView(true);
      this.viewCreator.node.scrollBy(0, -10);
    } else {
      this.viewCreator.node.scrollTop = this.viewCreator.node.scrollHeight;
    }
  }

  private getMessageHistory() {
    this.controller.fetchMessageHistory<AllMessagesResponse>(this.targetLogin, (data) => {
      if (data && data.type === 'MSG_FROM_USER') {
        data.payload.messages.forEach((msg) => this.handleNewMessage(msg));
        this.render();
      }
    });
    this.listenMessages();
  }

  private setMsgStatus(id: string, isRead: boolean, isDelivered: boolean) {
    if (!this.messagesList.has(id)) return;
    const msg: DialogItemView = this.messagesList.get(id)!;
    msg.setStatus(isRead, isDelivered);
  }

  private listenMessages() {
    this.state.subscribe(this.viewCreator, 'unhandledResponse', (data) => {
      if (!data) return;
      if (data.type === 'MSG_DELIVER') {
        this.setMsgStatus(data.payload.message.id, false, data.payload.message.status.isDelivered);
        return;
      }
      if (data.type === 'MSG_READ') {
        this.setMsgStatus(data.payload.message.id, data.payload.message.status.isReaded, false);
      }
      if (data.type === 'MSG_DELETE') {
        if (data.payload.message.status.isDeleted) {
          this.deleteMessage(data.payload.message.id);
        }
      }
      if (data.type === 'MSG_EDIT') {
        if (!this.messagesList.has(data.payload.message.id) || !data.payload.message.status) return;
        this.messagesList.get(data.payload.message.id)?.editMessage(data.payload.message.text);
      }
    });
  }

  private addSeparator() {
    if (this.isSeparatorInserted) return;
    this.isSeparatorInserted = true;
    this.viewCreator.node.append(this.separator.viewCreator.node);
  }

  public removeSeparator() {
    this.isSeparatorInserted = false;
    this.separator.viewCreator.node.remove();
    this.messagesList.forEach((msg) => msg.closeModal());
  }

  public readAllMessages() {
    this.unreadMessages.forEach((msgId) => this.controller.setReadStatus(msgId));
    this.state.next('onReadMessage', () => `${this.targetLogin}`);
    this.unreadMessages = [];
    this.removeSeparator();
  }

  private deleteMessage(id: string) {
    this.messagesList.get(id)?.remove();
    this.messagesList.delete(id);
  }
}
