import View from '../../../classes/View';

export default class BarCellView extends View {
  constructor(text) {
    const params = {
      tag: 'div',
      css: ['bar-cell'],
      text,
    };
    super(params);
  }
}
