import NodeCreator from './NodeCreate';

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

  showModal(node) {
    if (this.modal) {
      this.modal.removeNode();
    }
    document.body.classList.add('blocked');
    const modal = new NodeCreator({
      tag: 'div',
      cssClasses: ['modal'],
      callback: () => {
        this.modal.removeNode();
        document.body.classList.remove('blocked');
      },
    });
    const closeModal = new NodeCreator({
      tag: 'div',
      cssClasses: ['modal-close'],
    });
    modal.addInnerNode(closeModal, node);
    this.modal = modal;
    document.body.append(modal.getNode());
  }
}
