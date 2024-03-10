import NodeParams from '../../../../interfaces/NodeParams';
import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/VIew';

const nodesData: Record<string, NodeParams> = {
  nextBtn: {
    tag: 'button',
    css: ['game-controls_button'],
    text: 'continue',
  },
  hintBtn: {
    tag: 'button',
    css: ['game-controls_button'],
    text: "don't know",
  },
  checkBtn: {
    tag: 'button',
    css: ['game-controls_button'],
    text: 'check',
  },
};

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
    const next = new NodeCreator({ ...nodesData.nextBtn });
    const stupid = new NodeCreator({ ...nodesData.hintBtn, tag: 'button' });
    const check = new NodeCreator({ ...nodesData.checkBtn, tag: 'button' });
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

    this.state
      .subscribe(this.viewCreator, 'checkSentence', (v) => {
        check.node.disabled = !v || false;
      })
      .next(() => undefined);
  }
}
