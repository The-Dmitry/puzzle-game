import './dialogItemView.scss';
import View from '../../../../../../common/view/View';
import NodeCreator from '../../../../../../common/nodeCreator/NodeCreator';
import { MessageType } from '../../../../../../../types/MessagePayload';

export default class DialogItemView extends View {
  private text = new NodeCreator({ tag: 'p', css: ['message-text'] });

  private status = new NodeCreator({ tag: 'p', css: ['message-status'] });

  constructor(message: MessageType, targetLogin: string) {
    super({
      tag: 'li',
      css: ['message-item', `message-item_${message.to === targetLogin ? 'outgoing' : 'incoming'}`],
    });
    this.render(message, targetLogin);
  }

  private render(message: MessageType, targetLogin: string) {
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
      this.status.setTextContent(`${message.status.isReaded ? 'read' : 'delivered'}`);
      this.addNodeInside(sender, this.text, time, this.status);
    } else {
      this.addNodeInside(sender, this.text, time);
    }
  }
}
