import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/VIew';

export default class GameControlsView extends View {
  constructor(private readonly checkSentence: () => void) {
    super({
      tag: 'div',
      css: ['game-controls'],
    });
    this.render();
  }

  private render() {
    const stupid = new NodeCreator({
      tag: 'button',
      css: ['game-controls_button'],
      text: "don't know",
    });
    const check = new NodeCreator({
      tag: 'button',
      css: ['game-controls_button'],
      text: 'check',
      callback: () => this.checkSentence(),
    });
    this.addNodeInside(stupid, check);

    this.state
      .subscribe(check, 'checkSentence', (v) => {
        check.node.disabled = !v || false;
      })
      .next(() => undefined);
  }
}
