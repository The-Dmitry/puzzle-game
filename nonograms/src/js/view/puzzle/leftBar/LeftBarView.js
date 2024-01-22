import './Bar.scss';
import NodeCreator from '../../../classes/NodeCreator';
import View from '../../../classes/View';
import BarCellView from './BarCellView';

export default class LeftBarView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['left-bar', 'bar'],
    };
    super(params);
    // this.configureView();
  }

  configureView() {}

  generateGame(scheme) {
    const { length } = scheme[0];
    // console.table(scheme.field);
    for (let i = 0; i < length; i += 1) {
      let count = 0;
      const row = new NodeCreator({
        tag: 'div',
        css: ['left-bar__row'],
      });
      for (let j = 0; j < length; j += 1) {
        if (scheme[i][j]) {
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
