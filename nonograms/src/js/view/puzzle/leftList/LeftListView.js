import View from '../../../classes/View';

export default class LeftListView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['left-list', 'puzzle__item'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}
}
