import './FieldView.scss';
import View from '../../../classes/View';
import FieldCellView from './FieldCellView';

export default class FieldView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['field', 'puzzle__item'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}

  generateField(scheme) {
    const btns = scheme.field.map((arr) =>
      arr.map((info) => new FieldCellView(info))
    );
    btns.forEach((arr) => this.addViewInside(...arr));
  }
}
