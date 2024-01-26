import View from '../../../classes/View';
import Observer from '../../../classes/observer/Observer';
import ObserverActions from '../../../classes/observer/observerAtions';

export default class TimerView extends View {
  #seconds = 0;

  stopwatch;

  #observer = Observer.getInstance();

  constructor() {
    super({
      tag: 'p',
      css: ['stopwatch'],
      text: '00:00',
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
    const sec = parseInt(num % 60, 10);
    const min = Math.floor(num / 60);
    this.viewNode.setTextContent(
      `${min.toString().padStart(2, 0)}:${sec.toString().padStart(2, 0)}` ||
        '00:00'
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
