import NodeCreator from '../classes/NodeCreator';

export default class View {
  modal = null;

  constructor(params) {
    this.viewNode = new NodeCreator(params);
  }

  getElement() {
    return this.viewNode.getNode();
  }

  addViewInside(...view) {
    view.forEach((inst) => this.viewNode.addInnerNode(inst.getElement()));
  }

  showModal(nodes) {
    const modal = new NodeCreator({
      tag: 'div',
      css: ['modal'],
      // callback: () => this.closeModal(),
    });
    modal.addInnerNode(...nodes);
    this.modal = modal;
    setTimeout(() => {
      document.body.append(this.modal.getNode());
    }, 1000);
  }

  closeModal() {
    if (this.modal) {
      this.modal.getNode().remove();
      // document.body.classList.remove('blocked');
    }
  }

  blockView(boolean) {
    if (boolean) {
      this.viewNode.addClassName('blocked');
      return;
    }
    this.viewNode.removeCLassName('blocked');
  }
}
