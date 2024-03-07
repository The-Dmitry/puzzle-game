import './gamePageView.scss';
// import NodeParams from '../../interfaces/NodeParams';
import wordCollection from '../../data/wordCollection';
import HttpClient from '../common/httpClient/HttpClient';
import View from '../common/view/VIew';
import HeaderView from '../header/HeaderView';
import GameView from './gameView/GameView';
import { WordCollection } from '../../interfaces/WordCollection';

// const nodesData: Record<string, NodeParams> = {
//   container: {
//     tag: 'div',
//     css: ['start-screen__container'],
//   },
// };

export default class GamePageView extends View {
  private httpClient = new HttpClient();

  private wordCollection = wordCollection;

  private activePage: View | null = null;

  constructor() {
    super({
      tag: 'div',
      css: ['game-page'],
    });
    this.getData();
  }

  private async getData() {
    const data = await this.httpClient.fetch<WordCollection>(wordCollection[0]);
    this.render(data);
  }

  private render(data: WordCollection) {
    const header = new HeaderView();
    const game = new GameView(data);
    this.addNodeInside(header, game);
  }
}
