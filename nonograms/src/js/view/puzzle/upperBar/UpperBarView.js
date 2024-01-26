import NodeCreator from '../../../classes/NodeCreator';
import View from '../../../classes/View';
import BarCellView from '../leftBar/BarCellView';

const CSS_CLASSES = {
  bar: 'upper-bar',
};

export default class UpperBarView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: [CSS_CLASSES.bar, 'bar'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}

  generateGame(scheme) {
    this.viewNode.removeAllChildren();
    const { length } = scheme;
    this.viewNode.setClassNames([
      CSS_CLASSES.bar,
      `${CSS_CLASSES.bar}_${length}`,
    ]);
    const result = [];
    for (let i = 0; i < length; i += 1) {
      let count = 0;
      const row = [];
      for (let j = 0; j < length; j += 1) {
        if (scheme[j][i]) {
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
        css: ['upper-bar__column'],
      });
      row.addInnerNode(
        ...arr.map((item) => new BarCellView(item).getElement())
      );
      this.viewNode.addInnerNode(row);
    });
  }
}
