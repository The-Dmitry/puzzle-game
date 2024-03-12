import { Word } from '../../../interfaces/WordCollection';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/VIew';

export default class StatisticsGroupItemView extends View {
  constructor(data: Word) {
    super({ tag: 'li', css: ['statistics-item'] });
    this.render(data);
  }

  private render(data: Word) {
    const text = new NodeCreator({
      tag: 'p',
      css: ['statistics-item__text'],
      text: data.textExample,
    });
    this.addNodeInside(text);
  }
}
