import './dialogItemView.scss';
import View from '../../../../../../common/view/View';
import NodeCreator from '../../../../../../common/nodeCreator/NodeCreator';
import { MessagePayload } from '../../../../../../../types/MessagePayload';

export default class DialogItemView extends View {
  constructor(data: MessagePayload, targetLogin: string) {
    super({
      tag: 'li',
      css: ['message-item', `message-item_${data.message.to === targetLogin ? 'outgoing' : 'incoming'}`],
    });
    this.render(data);
  }

  private render(data: MessagePayload) {
    const text = new NodeCreator({
      tag: 'p',
      text: data.message.text,
    });
    const time = new NodeCreator({
      tag: 'p',
      text: new Date(data.message.datetime).toLocaleTimeString(),
    });
    this.addNodeInside(text, time);
  }
}
