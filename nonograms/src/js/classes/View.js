import NodeCreator from './NodeCreator';

export default class View {
  constructor(params) {
    this.viewNode = new NodeCreator(params);
  }

  getElement() {
    return this.viewNode.getNode();
  }

  addViewInside(...view) {
    view.forEach((inst) => this.viewNode.addInnerNode(inst.getElement()));
  }

  blockView(boolean) {
    if (boolean) {
      this.viewNode.addClassName('blocked');
      return;
    }
    this.viewNode.removeCLassName('blocked');
  }

  playSound(sound) {
    const audio = new Audio();
    audio.src = sound;
    audio.play();
  }
}
