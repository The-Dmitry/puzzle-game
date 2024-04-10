import './dialogView.scss';
import View from '../../../../../common/view/View';
import Controller from '../../../../../controller/Controller';
import { MessageType } from '../../../../../../types/MessagePayload';
import DialogItemView from './messageItem/DialogItemView';
import { AllMessagePayload } from '../../../../../../types/AllMessagePayload';
import NodeCreator from '../../../../../common/nodeCreator/NodeCreator';

export default class DialogView extends View {
  private placeholder = new NodeCreator({
    tag: 'li',
    css: ['dialog__empty-notification'],
    text: 'Send your first message',
  });

  private messagesList = new Map();

  constructor(
    private readonly controller: Controller,
    private readonly targetLogin: string
  ) {
    super({ tag: 'ul', css: ['dialog'] });
    this.getMessageHistory();
  }

  public handleNewMessage(message: MessageType) {
    const dialogItem = new DialogItemView(message, this.targetLogin);
    this.messagesList.set(message.id, dialogItem);
    this.addNodeInside(dialogItem);
    this.viewCreator.node.scrollTo(0, 9999);
    this.placeholder.remove();
  }

  private render() {
    if (this.messagesList.size > 0) return;
    this.addNodeInside(this.placeholder);
  }

  private getMessageHistory() {
    this.controller.fetchMessageHistory<AllMessagePayload>(this.targetLogin, (data) => {
      if (data && 'messages' in data.payload) {
        data.payload.messages.forEach((msg) => this.handleNewMessage(msg));
        this.render();
      }
    });
  }
}
