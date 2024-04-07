import View from '../../common/view/View';

export default class NotFoundView extends View {
  constructor() {
    super({
      tag: 'div',
      text: 'not-found',
    });
  }
}
