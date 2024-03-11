import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/VIew';

export default class StatisticsView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['statistics'],
    });
    this.render();
  }

  private render() {
    const btn = new NodeCreator({
      tag: 'button',
      text: 'Next game',
      callback: () => this.state.next('gameRound', (v) => v! + 1),
    });
    this.addNodeInside(btn);
  }
}
