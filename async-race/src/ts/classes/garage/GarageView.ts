import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';
import TrackView from './trackView/TrackView';

export default class GarageView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['garage'],
    });
    this.render();
  }

  private render() {
    this.addNodeInside(new TrackView());
  }
}
