import './userMessagesView.scss';
import View from '../../../common/view/View';
import EmptyDialogView from './emptyDialog/EmptyDialogVIew';
import Controller from '../../../controller/Controller';
import DialogView from './userDialog/dialogView/DialogView';
import DialogInputView from './userDialog/dialogInput/DialogInputView';
import { MessagePayload } from '../../../../types/MessagePayload';

export default class UserMessagesView extends View {
  private activeDialog: DialogView | null = null;

  constructor(private readonly controller: Controller) {
    super({ tag: 'div', css: ['user-messages'] });
    this.render();
  }

  private render() {
    this.addNodeInside(new EmptyDialogView());
  }

  public startNewDialog(targetLogin: string) {
    this.removeAllChildren();
    const dialog = new DialogView(this.controller, targetLogin);
    const input = new DialogInputView(this.controller, targetLogin);
    this.activeDialog = dialog;
    this.addNodeInside(dialog, input);
  }

  public handleNewMessage(message: MessagePayload) {
    if (this.activeDialog) this.activeDialog.handleNewMessage(message.message);
  }
}
