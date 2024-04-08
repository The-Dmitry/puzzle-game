import NodeCreator from '../nodeCreator/NodeCreator';

export default class Observable<T> {
  private subscribers = new Set<(params: T | null) => void>();

  constructor(private value: T | null = null) {}

  public subscribe(node: NodeCreator | null, callback: (params: T | null) => T | null, trigger: boolean) {
    this.subscribers.add(callback);
    if (trigger) {
      callback(this.value);
    }
    if (node) {
      node.saveSubscription(() => this.subscribers.delete(callback));
    }
  }

  public next(callback: (value: T | null) => T | null) {
    const result = callback(this.value);
    if (result !== this.value) {
      this.value = result;
      this.notifySubscribers();
    }
  }

  private notifySubscribers() {
    this.subscribers.forEach((sub) => sub(this.value));
  }

  public get getValue() {
    return this.value;
  }

  public clearValue() {
    this.value = null;
  }
}
