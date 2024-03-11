import NodeCreator from '../nodeCreator/NodeCreator';

export default class Observable<T> {
  private subscribers = new Set<(params: T | null) => void>();

  constructor(private value: T | null = null) {}

  public subscribe(node: NodeCreator, callback: (params: T | null) => T | null, trigger: boolean) {
    this.subscribers.add(callback);
    if (trigger) {
      callback(this.value);
    }
    node.saveSubscription(() => this.subscribers.delete(callback));
  }

  public next(callback: (value: T | null) => T | null) {
    this.value = callback(this.value);
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach((sub) => sub(this.value));
  }

  public get getValue() {
    return this.value;
  }

  public clearValue() {
    this.value = null
  }
}
