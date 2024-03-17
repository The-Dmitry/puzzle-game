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
    const text = new NodeCreator({
      tag: 'p',
      css: ['statistics__text'],
      text: `${data.author} - ${data.name}. (${data.year})`,
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
    this.addNodeInside(image, text);
  }
}
