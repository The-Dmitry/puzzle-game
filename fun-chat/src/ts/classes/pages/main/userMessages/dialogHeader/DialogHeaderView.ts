import NodeCreator from '../../../../common/nodeCreator/NodeCreator';
import View from '../../../../common/view/View';
import './dialogHeaderView.scss';

export default class DialogHeaderView extends View {
  private info = new NodeCreator({ tag: 'p', css: ['dialog-header__user'] });

  constructor(
    private readonly login: string,
    private status: boolean
  ) {
    super({ tag: 'div', css: ['dialog-header'] });
    this.render();
    this.info.setTextContent(login);
    this.state.subscribe(
      this.viewCreator,
      'unhandledResponse',
      (data) =>
        data &&
        'user' in data.payload &&
        data.payload.user.login === this.login &&
        this.setStatus(data.payload.user.isLogined),
      false
    );
  }

  private render() {
    const backToUsersList = new NodeCreator({
      tag: 'button',
      css: ['dialog-header__button'],
      callback: () => this.state.next('toUserList', () => false),
    });
    this.addNodeInside(this.info, backToUsersList);
    this.setStatus();
  }

  private setStatus(status = this.status) {
    if (status) {
      this.info.removeCLassName('dialog-header__user_offline');
      this.info.addClassName('dialog-header__user_online');
    } else {
      this.info.removeCLassName('dialog-header__user_online');
      this.info.addClassName('dialog-header__user_offline');
    }
  }
}
