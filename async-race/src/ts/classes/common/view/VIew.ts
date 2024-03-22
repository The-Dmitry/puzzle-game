import NodeParams from '../../../interfaces/NodeParams';
import HttpClient from '../httpClient/HttpClient';
import NodeCreator from '../nodeCreator/NodeCreator';
import State from '../state/State';

export default abstract class View<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> {
  private viewNodeClass: NodeCreator;

  protected state: State = State.getInstance();

  protected httpClient: HttpClient = HttpClient.getInstance();

  constructor(params: NodeParams<T>) {
    this.viewNodeClass = new NodeCreator(params);
  }

  public get viewCreator() {
    return this.viewNodeClass;
  }

  public addNodeInside(...view: (View | NodeCreator)[]) {
    view.forEach((item) => {
      if (item instanceof View) {
        this.viewNodeClass.addInnerNode(item.viewCreator);
        return;
      }
      this.viewNodeClass.addInnerNode(item);
    });
  }

  public remove() {
    this.viewNodeClass.remove();
  }

  protected removeAllChildren() {
    this.viewNodeClass.removeAllChildren();
  }
}
