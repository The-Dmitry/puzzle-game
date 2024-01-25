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
    const { length } = scheme;
    this.viewNode.setClassNames(['left-bar', `left-bar_${length}`]);
    const result = [];
    for (let i = 0; i < length; i += 1) {
      let count = 0;
      let row = [];
      for (let j = 0; j < length; j += 1) {
        if (scheme[i][j]) {
          count += 1;
        } else {
          if (count) {
            row.push(count);
          }
          count = 0;
        }
        if (j === length - 1 && count) {
          row.push(count);
        }
      }
      result.push(row);
    }
    const maxLength = Math.max(...result.map((item) => item.length));
    const arrRowEqualLength = result.map((arr) => [
      ...new Array(maxLength - arr.length).fill(''),
      ...arr,
    ]);
    arrRowEqualLength.forEach((arr) => {
      const row = new NodeCreator({
        tag: 'div',
        css: ['left-bar__row'],
      });
      row.addInnerNode(
        ...arr.map((item) => new BarCellView(item).getElement())
      );
      this.viewNode.addInnerNode(row);
    });
  }
}
