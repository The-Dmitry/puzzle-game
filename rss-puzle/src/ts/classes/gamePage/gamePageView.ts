import './gamePageView.scss';
import View from '../common/view/VIew';
import HeaderView from '../header/HeaderView';
import GameView from './gameView/GameView';
import { Round, WordCollection } from '../../interfaces/WordCollection';
import StatisticsView from './statisticsView/StatisticsView';
import MenuView from '../menu/MenuView';

export default class GamePageView extends View {
  private burgerMenu = new MenuView(this.collection);

  private activeViews: View[] = [];

  private round = 0;

  private difficulty = 0;

  constructor(private collection: WordCollection[]) {
    super({
      tag: 'div',
      css: ['game-page'],
    });

    this.state.next('lastCompletedGame', (data) => {
      this.state.next('gameDifficulty', () => (data ? data.difficulty : 0));
      this.state.next('gameRound', () => (data ? data.round : 0));
      return data;
    });
    this.state.subscribe(this.viewCreator, 'gameDifficulty', (diff) => {
      if (typeof diff === 'number' && diff >= 0) {
        if (diff > this.collection.length - 1) {
          this.state.next('gameDifficulty', () => 0);
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
    this.state.subscribe(
      this.viewCreator,
      'toggleBurgerMenu',
      () => this.addNodeInside(new MenuView(this.collection)),
      false
    );
  }

  private nextRound() {
    if (!this.collection) {
      return;
    }
    if (this.round > this.collection[this.difficulty].roundsCount - 1) {
      this.state.next('gameDifficulty', (diff) => (typeof diff === 'number' ? diff + 1 : 0));
      this.state.next('gameRound', () => 0);
      return;
    }
    this.renderGame(this.collection[this.difficulty].rounds[this.round]);
  }

  private renderGame(data: Round) {
    if (!data) return;
    this.clearGamePage();
    this.activeViews.push(new HeaderView(), new GameView(data));
    this.addNodeInside(...this.activeViews);
  }

  private renderStatistics() {
    this.clearGamePage();
    this.activeViews.push(new StatisticsView(this.collection[this.difficulty].rounds[this.round]));
    this.addNodeInside(...this.activeViews);
  }

  private saveCompletedGame() {
    this.state.next('lastCompletedGame', () => ({ difficulty: this.difficulty, round: this.round }));
    this.state.next('completedGames', (v) => {
      const obj = v || {};
      if (obj[this.difficulty]) {
        obj[this.difficulty].push(this.round);
      } else {
        obj[this.difficulty] = [this.round];
      }
      console.log(obj);

      return obj;
    });
  }

  private clearGamePage() {
    this.activeViews.forEach((view) => view.remove());
    this.activeViews = [];
  }
}
