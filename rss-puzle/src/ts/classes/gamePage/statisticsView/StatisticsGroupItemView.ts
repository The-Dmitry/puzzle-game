import { Word } from '../../../interfaces/WordCollection';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/VIew';
import AudioHintView from '../audioHintView.ts/AudioHintView';

export default class StatisticsGroupItemView extends View {
  constructor(data: Word) {
    super({ tag: 'li', css: ['statistics-item'] });
    this.render(data);
  }

  private render(data: Word) {
    const audio = new AudioHintView(data.audioExample);
    const text = new NodeCreator({
      tag: 'p',
      css: ['statistics-item__text'],
      text: data.textExample,
    });
    this.addNodeInside(audio, text);
  }
}
