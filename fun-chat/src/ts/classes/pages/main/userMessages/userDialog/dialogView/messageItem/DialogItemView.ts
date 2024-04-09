import './dialogItemView.scss';
import View from '../../../../../../common/view/View';
import NodeCreator from '../../../../../../common/nodeCreator/NodeCreator';
import { MessageType } from '../../../../../../../types/MessagePayload';

export default class DialogItemView extends View {
  constructor(message: MessageType, targetLogin: string) {
    super({
      tag: 'li',
      css: ['message-item', `message-item_${message.to === targetLogin ? 'outgoing' : 'incoming'}`],
    });
    this.render(message);
  }

  private render(message: MessageType) {
    const text = new NodeCreator({
      tag: 'p',
      text: message.text,
    });
    const time = new NodeCreator({
      tag: 'p',
      text: new Date(message.datetime).toLocaleTimeString(),
    });
    this.addNodeInside(text, time);
  }
}
