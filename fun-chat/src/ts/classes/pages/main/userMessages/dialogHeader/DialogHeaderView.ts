import NodeCreator from '../../../../common/nodeCreator/NodeCreator';
import View from '../../../../common/view/View';
import './dialogHeaderView.scss';

export default class DialogHeaderView extends View {
  private info = new NodeCreator({ tag: 'p' });

  constructor(
    private readonly login: string,
    private status: boolean
  ) {
    super({ tag: 'div', css: ['dialog-header'] });
    this.render();
    this.state.subscribe(
      this.viewCreator,
      'unhandledResponse',
      (data) =>
        data &&
        'user' in data.payload &&
        data.payload.user.login === this.login &&
        this.setText(data.payload.user.isLogined),
      false
    );
  }

  private render() {
    this.addNodeInside(this.info);
    this.setText();
  }

  private setText(status = this.status) {
    this.info.setTextContent(`${this.login}: ${status ? 'online' : 'offline'}`);
  }
}
