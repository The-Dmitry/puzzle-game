import NodeCreator from '../../../classes/NodeCreator';
import View from '../../../classes/View';
import BarCellView from '../leftBar/BarCellView';

export default class UpperListView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['upper-bar', 'bar'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}

  generateGame(scheme) {
    const { length } = scheme[0];
    for (let i = 0; i < length; i += 1) {
      let count = 0;
      const row = new NodeCreator({
        tag: 'div',
        css: ['upper-bar__row'],
      });
      for (let j = 0; j < length; j += 1) {
        if (scheme[j][i]) {
          count += 1;
        } else {
          if (count) {
            row.addInnerNode(new BarCellView(count).getElement());
          }
          count = 0;
        }
        if (j === length - 1 && count) {
          row.addInnerNode(new BarCellView(count).getElement());
        }
      }
      this.viewNode.addInnerNode(row);
    }
  }
}
