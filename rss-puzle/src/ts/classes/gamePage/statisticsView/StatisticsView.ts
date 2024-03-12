import './statisticsView.scss';
import { Round } from '../../../interfaces/WordCollection';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/VIew';
import StatisticsGroupView from './StatisticsGroupView';
import StatisticsLvlInfoView from './StatisticsLvlInfoView';

export default class StatisticsView extends View {
  private unresolvedSentences: number[] = [];

  constructor(private data: Round) {
    super({
      tag: 'div',
      css: ['statistics'],
    });
    console.log(data);

    this.state.subscribe(this.viewCreator, 'unresolvedSentences', (v) => {
      if (!Array.isArray(v)) return;
      this.unresolvedSentences = v;
    });
    this.render();
  }

  private render() {
    const toRender = [];
    const info = new StatisticsLvlInfoView(this.data.levelData);
    toRender.push(info);
    if (this.unresolvedSentences.length !== 10) {
      const uKnow = new StatisticsGroupView(
        'You Know',
        this.data.words.filter((_, i) => !this.unresolvedSentences.includes(i))
      );
      toRender.push(uKnow);
    }
    if (this.unresolvedSentences.length !== 0) {
      const uDontKnow = new StatisticsGroupView(
        "You don't Know",
        this.data.words.filter((_, i) => this.unresolvedSentences.includes(i))
      );
      toRender.push(uDontKnow);
    }
    const btn = new NodeCreator({
      tag: 'button',
      text: 'Next game',
      callback: () => this.state.next('gameRound', (v) => v! + 1),
    });
    toRender.push(btn);

    this.addNodeInside(...toRender);
  }
}
