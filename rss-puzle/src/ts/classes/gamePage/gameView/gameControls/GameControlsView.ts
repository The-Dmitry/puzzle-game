import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/VIew';

export default class GameControlsView extends View {
  constructor(
    private readonly checkSentence: () => boolean,
    private readonly autoComplete: () => void
  ) {
    super({
      tag: 'div',
      css: ['game-controls'],
    });
    this.render();
  }

  private render() {
    const next = new NodeCreator({
      tag: 'button',
      css: ['game-controls_button'],
      text: 'continue',
    });
    const stupid = new NodeCreator({
      tag: 'button',
      css: ['game-controls_button'],
      text: "don't know",
    });
    const check = new NodeCreator({
      tag: 'button',
      css: ['game-controls_button'],
      text: 'check',
    });
    check.setCallback(() => {
      const result = this.checkSentence();
      if (result) {
        check.remove();
        this.addNodeInside(next);
      }
    });
    next.setCallback(() => {
      this.state.next('nextLevel', () => 1);
      next.remove();
      stupid.node.disabled = false;
      this.addNodeInside(check);
    });
    stupid.setCallback(() => {
      this.autoComplete();
      stupid.node.disabled = true;
      check.remove();
      this.addNodeInside(next);
    });

    this.addNodeInside(stupid, check);

    this.state.subscribe(
      this.viewCreator,
      'checkSentence',
      (v) => {
        check.node.disabled = !v || false;
      },
      false
    );
  }
}
