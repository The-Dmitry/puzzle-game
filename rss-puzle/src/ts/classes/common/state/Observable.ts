import NodeCreator from '../nodeCreator/NodeCreator';

export default class Observable<T> {
  private value: T | undefined;

  private subscribers = new Set<(params?: T) => void>();

  constructor(value: T | undefined = undefined) {
    this.value = value;
    this.subscribers.add((v) => v);
  }

  public subscribe(node: NodeCreator, callback: (params?: T) => void) {
    this.subscribers.add(callback);
    callback(this.value);
    node.saveSubscription(() => this.subscribers.delete(callback));
  }

  private get getValue() {
    console.log('удалить этот метод');
    return this.value;
  }

  public next(callback: (value?: T) => T) {
    this.value = callback(this.value);
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach((sub) => sub(this.value));
  }

  public logSub() {
    console.log(this.subscribers);
  }
}
