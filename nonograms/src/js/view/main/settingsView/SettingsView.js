import View from '../../../classes/View';

export default class SettingsView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['settings'],
    };
    super(params);
  }
}
