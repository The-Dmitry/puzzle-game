import StateParams from './StateParams';
import NodeCreator from '../nodeCreator/NodeCreator';
import Observable from './Observable';

export default class State {
  private static instanceEventEmitter = new State();

  private observables = new Map();

  constructor() {
    this.getFromLocalStorage();
    window.addEventListener('beforeunload', () => this.saveToLocalStorage());
  }

  public static getInstance() {
    return this.instanceEventEmitter;
  }

  public subscribe<T extends keyof StateParams>(
    node: NodeCreator,
    action: T,
    callback: (value: StateParams[T]) => void
  ) {
    if (!this.observables.has(action)) {
      this.observables.set(action, new Observable<StateParams[T]>());
    }
    this.observables.get(action)!.subscribe(node, callback);
  }

  public next<T extends keyof StateParams>(action: T, callback: (value: StateParams[T]) => StateParams[T]) {
    if (this.observables.has(action)) {
      this.observables.get(action)!.next(callback);
    }
  }

  public log(action: string) {
    this.observables.get(action)?.logSub();
  }

  private saveToLocalStorage() {
    const data = Array.from(this.observables.entries(), ([name, inst]) => [name, inst.getValue]);
    localStorage['rss-puzzle-state'] = JSON.stringify(data);
  }

  private getFromLocalStorage<T extends keyof StateParams>() {
    const data = localStorage['rss-puzzle-state'];
    if (data) {
      JSON.parse(data).forEach(([action, value]: [T, StateParams[T]]) => {
        this.observables.set(action, new Observable(value));
      });
    }
  }
}
