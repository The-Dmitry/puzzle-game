import NodeCreator from '../nodeCreator/NodeCreator';

export default class Observable<T> {
  private value: T | undefined;

  private subscribers = new Set<(params?: T) => void>();

  constructor(value: T | undefined = undefined) {
    this.value = value;
    this.subscribers.add((v) => v);
  }

  public subscribe(node: NodeCreator, callback: (params?: T) => T) {
    this.subscribers.add(callback);
    callback(this.value);
    node.saveSubscription(() => this.subscribers.delete(callback));
  }

  // delete this method
  private get getValue() {
    return this.value;
  }

  public next(callback: (value?: T) => T) {
    const result = callback(this.value);
    if (result === this.value) {
      return;
    }
    this.value = result;
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach((sub) => sub(this.value));
  }

  public logSub() {
    console.log(this.subscribers);
  }
}
