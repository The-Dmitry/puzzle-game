import './dialogItemView.scss';
import View from '../../../../../../common/view/View';
import NodeCreator from '../../../../../../common/nodeCreator/NodeCreator';
import { MessagePayload } from '../../../../../../../types/MessagePayload';
import { MessageDeliveryStatus } from '../../../../../../../types/response/MessageDeliveryStatus';

export default class DialogItemView extends View {
  private text = new NodeCreator({ tag: 'p', css: ['message-text'] });

  private status = new NodeCreator({ tag: 'p', css: ['message-status'] });

  private messageInfo: MessagePayload;

  constructor(message: MessagePayload, targetLogin: string) {
    super({
      tag: 'li',
      css: ['message-item', `message-item_${message.to === targetLogin ? 'outgoing' : 'incoming'}`],
    });
    this.messageInfo = message;
    this.render(message, targetLogin);
  }

  private render(message: MessagePayload, targetLogin: string) {
    const time = new NodeCreator({
      tag: 'p',
      css: ['message-time'],
      text: new Date(message.datetime).toLocaleTimeString(),
    });
    const sender = new NodeCreator({
      tag: 'p',
      css: ['message-sender'],
      text: `${message.from === targetLogin ? targetLogin : 'You'}`,
    });
    this.text.setTextContent(message.text);
    if (message.to === targetLogin) {
      this.status.setTextContent(`sent`);
      this.setStatus(message.status.isReaded, message.status.isDelivered);
      this.addNodeInside(sender, this.text, time, this.status);
    } else {
      this.addNodeInside(sender, this.text, time);
    }
  }

  public setStatus(isRead: boolean, isDelivered: boolean) {
    if (isRead) {
      this.status.setTextContent('read');
      return;
    }
    if (isDelivered) {
      this.status.setTextContent('delivered');
    }
  }
}
