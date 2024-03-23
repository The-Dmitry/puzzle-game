import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';
import TrackView from './trackView/TrackView';

export default class GarageView extends View {
  private track = new TrackView();

  private startBtn = new NodeCreator({
    tag: 'button',
    css: ['garage__start-race'],
    text: 'start race',
  });

  private stopBtn = new NodeCreator({
    tag: 'button',
    css: ['garage__stop-race'],
    text: 'stop race',
  });

  constructor() {
    super({
      tag: 'div',
      css: ['garage'],
    });
    this.render();
    this.state.subscribe(
      this.viewCreator,
      'startSoloRace',
      () => {
        this.startBtn.node.disabled = true;
        this.stopBtn.node.disabled = false;
      },
      false
    );
  }

  private render() {
    this.addNodeInside(this.track, this.createControls());
    this.startBtn.setCallback(() => {
      this.track.startRace();
      this.startBtn.node.disabled = true;
      this.stopBtn.node.disabled = false;
    });
    this.stopBtn.setCallback(async () => {
      await this.track.stopRace();
      this.startBtn.node.disabled = false;
      this.stopBtn.node.disabled = true;
    });
    this.stopBtn.node.disabled = true;
  }

  private createControls() {
    const controls = new NodeCreator({
      tag: 'div',
      css: ['track__controls'],
    });
    controls.addInnerNode(this.startBtn, this.stopBtn);
    return controls;
  }
}
