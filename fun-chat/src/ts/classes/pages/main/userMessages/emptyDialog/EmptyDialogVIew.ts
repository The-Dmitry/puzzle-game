import View from '../../../../common/view/View';

export default class EmptyDialogView extends View {
  constructor() {
    super({ tag: 'div', css: ['empty-dialog'], text: 'EMPTY' });
  }
}
