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

  showModal() {
    const modal = new NodeCreator({
      tag: 'div',
      css: ['modal'],
      callback: () => this.closeModal(),
    });
    modal.addInnerNode(this.viewNode);
    this.modal = modal;
    document.body.append(this.modal.getNode());
    document.body.classList.add('blocked');
  }

  closeModal() {
    if (this.modal) {
      this.modal.getNode().remove();
      document.body.classList.remove('blocked');
    }
  }
}
