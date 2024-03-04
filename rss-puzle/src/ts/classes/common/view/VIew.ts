import NodeParams from '../../../interfaces/NodeParams';
import NodeCreator from '../nodeCreator/NodeCreator';
import State from '../state/State';

export default abstract class View<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> {
  private viewNodeClass: NodeCreator;

  protected state: State = State.getInstance();

  constructor(params: NodeParams<T>) {
    this.viewNodeClass = new NodeCreator(params);
  }

  public get node() {
    return this.viewNodeClass.node;
  }

  public get viewNodeCreator() {
    return this.viewNodeClass;
  }

  public addNodeInside(...view: (View | NodeCreator | HTMLElement)[]) {
    view.forEach((item) => {
      if (item instanceof View) {
        this.viewNodeClass.addInnerNode(item.node);
        return;
      }
      this.viewNodeClass.addInnerNode(item);
    });
  }

  public remove() {
    this.viewNodeClass.remove();
  }
}
