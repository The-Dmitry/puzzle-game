import View from '../../../classes/View';

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
    console.log(scheme.field);
  }
}
