import './dialogView.scss';
import View from '../../../../../common/view/View';
import Controller from '../../../../../controller/Controller';
import { MessagePayload } from '../../../../../../types/MessagePayload';
import DialogItemView from './messageItem/DialogItemView';

export default class DialogView extends View {
  private messagesList = new Map();

  constructor(
    private readonly controller: Controller,
    private readonly targetLogin: string
  ) {
    super({ tag: 'ul', css: ['dialog'] });
  }

  public handleNewMessage(message: MessagePayload) {
    const dialogItem = new DialogItemView(message, this.targetLogin);
    this.messagesList.set(message.message.id, dialogItem);
    this.addNodeInside(dialogItem);
  }
}
