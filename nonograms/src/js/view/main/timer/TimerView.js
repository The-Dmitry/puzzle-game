import View from '../../../classes/View';
import Observer from '../../../classes/observer/Observer';
import ObserverActions from '../../../classes/observer/observerActions';

export default class TimerView extends View {
  #seconds = 0;

  stopwatch;

  #observer = Observer.getInstance();

  constructor() {
    super({
      tag: 'p',
      css: ['stopwatch'],
      text: '00:00:00',
    });
    this.#observer.subscribe(ObserverActions.startTimer, () =>
      this.startTimer()
    );
    this.#observer.subscribe(ObserverActions.stopGame, () => this.stopTimer());
    // this.startTimer();
  }

  startTimer() {
    this.stopwatch = setTimeout(() => {
      this.#seconds += 1;
      this.updateText();
      this.startTimer();
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this.stopwatch);
  }

  updateText(num = this.#seconds) {
    this.viewNode.setTextContent(
      `${new Date(num * 1000).toISOString().slice(11, 19)}` || '00:00'
    );
  }

  set setSeconds(sec) {
    this.#seconds = sec;
    this.updateText();
  }

  get getSeconds() {
    return this.#seconds;
  }
}
