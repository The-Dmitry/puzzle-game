import './dialogItemView.scss';
import View from '../../../../../../common/view/View';
import NodeCreator from '../../../../../../common/nodeCreator/NodeCreator';
import { MessagePayload } from '../../../../../../../types/MessagePayload';
import Controller from '../../../../../../controller/Controller';

export default class DialogItemView extends View {
  private editedMessageNode: NodeCreator | null = null;

  private text = new NodeCreator({ tag: 'p', css: ['message-text'] });

  private status = new NodeCreator({ tag: 'p', css: ['message-status'] });

  private infoNode = new NodeCreator({ tag: 'ul', css: ['message-item__info'] });

  private modal: NodeCreator | null = null;

  constructor(
    private message: MessagePayload,
    targetLogin: string,
    private readonly controller: Controller,
    private readAllMessages: () => void
  ) {
    super({
      tag: 'li',
      css: ['message-item', `message-item_${message.to === targetLogin ? 'outgoing' : 'incoming'}`],
    });
    this.render(message, targetLogin);
  }

  private render(message: MessagePayload, targetLogin: string) {
    const time = new NodeCreator({
      tag: 'p',
      css: ['message-time'],
      text: new Date(message.datetime).toLocaleTimeString(),
    });
    const sender = new NodeCreator({
      tag: 'p',
      css: ['message-sender'],
      text: `${message.from === targetLogin ? targetLogin : 'You'}`,
    });
    this.text.setTextContent(message.text);
    if (message.to === targetLogin) {
      this.status.setTextContent(`sent`);
      this.setStatus(message.status.isReaded, message.status.isDelivered);
      this.infoNode.addInnerNode(time, this.status);
      this.viewCreator.setCallback(this.openModal.bind(this), 'contextmenu');
    } else {
      this.infoNode.addInnerNode(time);
    }
    this.addNodeInside(sender, this.text, this.infoNode);
    if (message.status.isEdited) {
      this.editMessage(null);
    }
    this.infoNode.setCallback((e) => e.stopPropagation(), 'contextmenu');
  }

  public setStatus(isRead: boolean, isDelivered: boolean) {
    if (isRead) {
      this.status.setTextContent('read');
      return;
    }
    if (isDelivered) {
      this.status.setTextContent('delivered');
    }
  }

  private openModal(e: Event) {
    if (!(e instanceof MouseEvent)) return;
    this.readAllMessages();
    e.preventDefault();
    this.modal?.remove();
    const menu = new NodeCreator({
      tag: 'div',
      css: ['message-item__menu', 'message-menu'],
    }).addInnerNode(
      new NodeCreator({
        tag: 'button',
        text: 'Edit',
        css: ['message-menu__edit'],
        callback: () =>
          this.state.next('editMessage', () => ({ text: this.text.node.textContent!, id: this.message.id })),
      }),
      new NodeCreator({
        tag: 'button',
        text: 'Delete',
        css: ['message-menu__delete'],
        callback: () => this.controller.deleteMessage(this.message.id),
      })
    );
    this.modal = menu;
    this.addNodeInside(menu);
    const menuWidth = menu.node.offsetWidth;
    menu.node.style.left = `${Math.max(-20, e.offsetX - menuWidth)}px`;
  }

  public closeModal() {
    this.modal?.remove();
    this.modal = null;
  }

  public editMessage(text: string | null) {
    if (text) {
      this.text.setTextContent(text);
    }
    if (!this.editedMessageNode) {
      this.editedMessageNode = new NodeCreator({ tag: 'p', css: ['message-edit'], text: 'edited' });
      this.infoNode.addInnerNode(this.editedMessageNode);
    }
  }
}
