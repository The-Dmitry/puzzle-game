import './userMessagesView.scss';
import View from '../../../common/view/View';
import EmptyDialogView from './emptyDialog/EmptyDialogVIew';
import Controller from '../../../controller/Controller';
import DialogView from './userDialog/dialogView/DialogView';
import DialogInputView from './userDialog/dialogInput/DialogInputView';
import DialogHeaderView from './dialogHeader/DialogHeaderView';
import { MessageResponse } from '../../../../types/response/MessageResponse';

export default class UserMessagesView extends View {
  private activeDialog: DialogView | null = null;

  constructor(private readonly controller: Controller) {
    super({ tag: 'div', css: ['user-messages'] });
    // this.render();
    this.state.subscribe(this.viewCreator, 'isWsActive', (v) => {
      if (v) this.render();
    });
  }

  private render() {
    this.removeAllChildren();
    this.activeDialog = null;
    this.addNodeInside(new EmptyDialogView());
  }

  public startNewDialog(targetLogin: string, status: boolean) {
    this.removeAllChildren();
    const header = new DialogHeaderView(targetLogin, status);
    const dialog = new DialogView(this.controller, targetLogin);
    const input = new DialogInputView(this.controller, targetLogin, () => dialog.readAllMessages());
    this.activeDialog = dialog;
    this.addNodeInside(header, dialog, input);
  }

  public handleNewMessage(message: MessageResponse) {
    if (this.activeDialog) this.activeDialog.handleNewMessage(message.payload.message);
  }
}
