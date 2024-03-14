import { LevelData } from '../../../interfaces/WordCollection';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/VIew';

const URL_TO_IMG = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/';

export default class StatisticsLvlInfoView extends View {
  constructor(data: LevelData) {
    super({
      tag: 'div',
      css: ['statisctics__info'],
    });
    this.render(data);
  }

  private render(data: LevelData) {
    const author = new NodeCreator({
      tag: 'p',
      css: ['statistics__author'],
      text: `Author: ${data.author}`,
    });
    const name = new NodeCreator({
      tag: 'p',
      css: ['statistics__name'],
      text: `Painting title:${data.name}`,
    });
    const year = new NodeCreator({
      tag: 'p',
      css: ['statistics__year'],
      text: `Year: ${data.year}`,
    });
    const image = new NodeCreator({
      tag: 'div',
      css: ['statistics__image'],
    });
    const img = new Image();
    img.src = `${URL_TO_IMG}${data.cutSrc}`;
    img.onload = () => {
      image.node.style.backgroundImage = `url(${URL_TO_IMG}${data.cutSrc})`;
    };
    this.addNodeInside(image, author, name, year);
  }
}
