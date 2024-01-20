import View from '../../../classes/View';

export default class UpperListView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['upper-list', 'puzzle__item'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}
}
