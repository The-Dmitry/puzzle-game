import NodeCreator from '../nodeCreator/NodeCreator';

export default class Observable<T> {
  private subscribers = new Set<(params?: T) => void>();

  constructor(private value: T | undefined = undefined) {}

  public subscribe(node: NodeCreator, callback: (params?: T) => T, trigger: boolean) {
    this.subscribers.add(callback);
    if (trigger) {
      callback(this.value);
    }
    node.saveSubscription(() => this.subscribers.delete(callback));
  }

  public next(callback: (value?: T) => T) {
    const result = callback(this.value);
    if (result === undefined && this.value === undefined) {
      return;
    }
    this.value = result;
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach((sub) => sub(this.value));
  }

  public get getValue() {
    return this.value;
  }
}
