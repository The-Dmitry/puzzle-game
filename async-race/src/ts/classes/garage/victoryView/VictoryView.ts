import './victoryView.scss';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/View';

export default class VictoryView extends View {
  constructor(
    private name: string,
    private time: number
  ) {
    super({
      tag: 'div',
      css: ['victory'],
    });
    this.render();
  }

  public render() {
    const title = new NodeCreator({ tag: 'h1', css: ['victory-title'], text: 'Winner' });
    const name = new NodeCreator({ tag: 'p', css: ['victory-name'], text: this.name });
    const time = new NodeCreator({ tag: 'p', css: ['victory-time'], text: `Time: ${this.time.toFixed(2)}` });
    this.state.next('blockView', () => true);
    setTimeout(() => {
      this.state.next('blockView', () => false);
      this.remove();
    }, 5000);
    this.addNodeInside(title, name, time);
  }
}
