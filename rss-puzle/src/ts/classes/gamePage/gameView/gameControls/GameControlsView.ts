import NodeParams from '../../../../interfaces/NodeParams';
import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/VIew';

const nodesData: Record<string, NodeParams> = {
  nextLvl: {
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
  nextRound: {
    tag: 'button',
    css: ['game-controls_button'],
    text: 'continue',
  },
  resultBtn: {
    tag: 'button',
    css: ['game-controls_button'],
    text: 'results',
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
    const nextLvl = new NodeCreator({ ...nodesData.nextLvl });
    const stupid = new NodeCreator({ ...nodesData.hintBtn, tag: 'button' });
    const check = new NodeCreator({ ...nodesData.checkBtn, tag: 'button' });
    const nextRound = new NodeCreator({ ...nodesData.nextRound, tag: 'button' });
    const resultBtn = new NodeCreator({
      ...nodesData.resultBtn,
      tag: 'button',
      callback: () => {
        this.state.next('showStatistics', (v) => v);
      },
    });
    check.setCallback(() => {
      const result = this.checkSentence();
      if (result) {
        check.remove();
        this.addNodeInside(nextLvl);
      }
    });
    nextLvl.setCallback(() => {
      this.state.next('nextLevel', () => 1);
      nextLvl.remove();
      stupid.node.disabled = false;
      this.addNodeInside(check);
    });
    stupid.setCallback(() => {
      check.remove();
      this.addNodeInside(nextLvl);
      this.autoComplete();
      stupid.node.disabled = true;
    });
    nextRound.setCallback(() => {
      this.state.next('gameRound', (v) => v! + 1);
    });

    this.addNodeInside(stupid, check);
    this.state
      .subscribe(stupid, 'blockStupidButton', (v) => {
        stupid.node.disabled = !!v;
      })
      .next(() => false);
    this.state.subscribe(
      this.viewCreator,
      'addNextRoundButton',
      () => {
        stupid.remove();
        nextLvl.node.style.display = 'none';
        this.addNodeInside(nextRound, resultBtn);
      },
      false
    );
    this.state
      .subscribe(this.viewCreator, 'checkSentence', (v) => {
        check.node.disabled = !!v;
      })
      .next(() => true);
  }
}
