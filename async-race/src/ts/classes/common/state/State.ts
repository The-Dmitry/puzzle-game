import StateParams from './StateParams';
import NodeCreator from '../nodeCreator/NodeCreator';
import Observable from './Observable';

export default class State {
  private static instanceState = new State();

  private observables = new Map();

  constructor() {
    this.getFromLocalStorage();
    window.addEventListener('beforeunload', () => this.saveToLocalStorage());
  }

  public static getInstance() {
    return this.instanceState;
  }

  public subscribe<T extends keyof StateParams>(
    node: NodeCreator,
    action: T,
    callback: (value: StateParams[T]) => void,
    trigger: boolean = true
  ): Observable<StateParams[T]> {
    this.isObservableExist(action);
    const inst = this.observables.get(action);
    inst.subscribe(node, callback, trigger);
    return inst;
  }

  public next<T extends keyof StateParams>(action: T, callback: (value: StateParams[T]) => StateParams[T]) {
    this.isObservableExist(action);
    this.observables.get(action).next(callback);
  }

  private isObservableExist<T extends keyof StateParams>(action: T) {
    if (!this.observables.has(action)) {
      this.observables.set(action, new Observable<StateParams[T]>());
    }
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

  public clearState() {
    this.observables.forEach((inst) => inst.clearValue());
  }
}
