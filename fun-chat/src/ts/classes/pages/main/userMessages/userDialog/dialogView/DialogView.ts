import './dialogView.scss';
import View from '../../../../../common/view/View';
import Controller from '../../../../../controller/Controller';
import { MessageType } from '../../../../../../types/MessagePayload';
import DialogItemView from './messageItem/DialogItemView';
import { AllMessagePayload } from '../../../../../../types/AllMessagePayload';

export default class DialogView extends View {
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
  }

  private getMessageHistory() {
    this.controller.fetchMessageHistory<AllMessagePayload>(this.targetLogin, (data) => {
      if (data && 'messages' in data.payload) {
        data.payload.messages.forEach((msg) => this.handleNewMessage(msg));
      }
    });
  }
}
