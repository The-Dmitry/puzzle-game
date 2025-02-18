import NodeParams from 'ts/interfaces/NodeParams';

export default class NodeCreator<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> {
  private nodeElement: HTMLElementTagNameMap[T];

  private unsubscribe: (() => boolean)[] = [];

  private children: NodeCreator[] = [];

  constructor(params: NodeParams<T>) {
    this.nodeElement = this.createNode(params);
  }

  public get node() {
    return this.nodeElement;
  }

  private createNode(params: NodeParams<T>) {
    this.nodeElement = document.createElement<T>(params.tag);
    if (params.css) this.setClassNames(params.css);
    if (params.text) this.setTextContent(params.text);
    if (params.callback) this.setCallback(params.callback);
    if (params.id) this.setId(params.id);
    return this.node;
  }

  public setClassNames(cssList: NodeParams['css']) {
    if (cssList) {
      this.nodeElement.className = '';
      this.nodeElement.classList.add(...cssList);
    }
  }

  public addClassName(cssName: string) {
    this.node.classList.add(cssName);
  }

  public removeCLassName(cssName: string) {
    this.node.classList.remove(cssName);
  }

  public setTextContent(text: NodeParams['text']) {
    if (text) this.nodeElement.textContent = text;
  }

  public setCallback(callback: (event: Event) => void, handler: keyof GlobalEventHandlersEventMap = 'click') {
    this.nodeElement.addEventListener(handler, callback);
  }

  protected setId(id: NodeParams['id']) {
    if (id) this.nodeElement.id = id;
  }

  public setAttribute(name: string, type: string = 'for') {
    this.nodeElement.setAttribute(type, name);
  }

  public addInnerNode(...list: NodeCreator[]) {
    list.forEach((item) => {
      this.nodeElement.append(item.node);
      this.children.push(item);
    });
  }

  public removeAllChildren() {
    this.children.forEach((child) => child.remove());
  }

  public saveSubscription(subFunc: () => boolean) {
    this.unsubscribe.push(subFunc);
  }

  public remove() {
    if (this.children) this.removeAllChildren();
    this.unsubscribeFromState();
    this.nodeElement.remove();
  }

  public unsubscribeFromState() {
    this.unsubscribe.forEach((func) => func());
  }
}
