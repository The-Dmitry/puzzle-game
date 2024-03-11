import './gamePageView.scss';
// import NodeParams from '../../interfaces/NodeParams';
import wordCollection from '../../data/wordCollection';
import HttpClient from '../common/httpClient/HttpClient';
import View from '../common/view/VIew';
import HeaderView from '../header/HeaderView';
import GameView from './gameView/GameView';
import { Round, WordCollection } from '../../interfaces/WordCollection';
import StatisticsView from './statisticView/StatisticsView';

// const nodesData: Record<string, NodeParams> = {
//   container: {
//     tag: 'div',
//     css: ['start-screen__container'],
//   },
// };

export default class GamePageView extends View {
  private httpClient = new HttpClient();

  private currentDiffData: WordCollection | null = null;

  private activeViews: View[] = [];

  private round = 0;

  private difficulty = 0;

  constructor() {
    super({
      tag: 'div',
      css: ['game-page'],
    });

    this.state.next('lastCompletedGame', (data) => {
      this.state.next('gameDifficulty', () => (data ? data.difficulty : 0));
      this.state.next('gameRound', () => (data ? data.round : 0));
      return data;
    });
    // this.state.next('gameRound', () => 20);
    // this.state.next('gameDifficulty', () => 5);
    this.state.subscribe(this.viewCreator, 'gameDifficulty', (diff) => {
      if (typeof diff === 'number' && diff >= 0) {
        if (diff > wordCollection.length - 1) {
          this.difficulty = 0;
          this.currentDiffData = null;
        } else {
          this.difficulty = diff;
        }
      }
    });
    this.state.subscribe(this.viewCreator, 'gameRound', (round) => {
      if (typeof round === 'number') {
        this.round = round;
        this.nextRound();
      }
    });
    this.state.subscribe(this.viewCreator, 'showStatistics', () => this.renderStatistics(), false);
    this.state.subscribe(this.viewCreator, 'saveCompletedGame', () => this.saveCompletedGame(), false);
  }

  private nextRound() {
    if (!this.currentDiffData) {
      this.getData();
      return;
    }
    if (this.round > this.currentDiffData.roundsCount - 1) {
      this.currentDiffData = null;
      this.state.next('gameDifficulty', (diff) => (typeof diff === 'number' ? diff + 1 : 0));
      this.state.next('gameRound', () => 0);
      return;
    }
    this.renderGame(this.currentDiffData.rounds[this.round]);
  }

  private async getData() {
    const data = await this.httpClient.fetch<WordCollection>(wordCollection[this.difficulty]);
    this.currentDiffData = data;
    this.nextRound();
  }

  private renderGame(data: Round) {
    if (!this.currentDiffData) return;
    console.log('ROUND:', this.round);

    this.clearGamePage();
    this.activeViews.push(new HeaderView(), new GameView(data));
    this.addNodeInside(...this.activeViews);
  }

  private renderStatistics() {
    this.clearGamePage();
    this.activeViews.push(new StatisticsView());
    this.addNodeInside(...this.activeViews);
  }

  private saveCompletedGame() {
    this.state.next('lastCompletedGame', () => ({ difficulty: this.difficulty, round: this.round }));
  }

  private clearGamePage() {
    this.activeViews.forEach((view) => view.remove());
    this.activeViews = [];
  }
}
