import { Word } from '../../../interfaces/WordCollection';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/VIew';
import StatisticsGroupItemView from './StatisticsGroupItemView';

export default class StatisticsGroupView extends View {
  constructor(text: string, items: Word[]) {
    super({
      tag: 'div',
      css: ['statistics-group'],
    });
    this.render(text, items);
  }

  private render(text: string, items: Word[]) {
    const title = new NodeCreator({ tag: 'div', css: ['statistics-group__title'], text });
    title.setAttribute(`${items.length}`, 'amount');
    const list = new NodeCreator({ tag: 'ul', css: ['statistics-group__list'] });
    items.forEach((item) => list.addInnerNode(new StatisticsGroupItemView(item).viewCreator));
    this.addNodeInside(title, list);
  }
}
