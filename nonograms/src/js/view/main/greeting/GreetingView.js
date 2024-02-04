import NodeCreator from '../../../classes/NodeCreator';
import View from '../../../classes/View';
import Observer from '../../../classes/observer/Observer';
import ObserverActions from '../../../classes/observer/observerActions';

export default class GreetingView extends View {
  #observer = Observer.getInstance();

  constructor(gameName, fieldSize, seconds) {
    super({
      tag: 'div',
      css: ['greeting'],
    });
    this.configureView(gameName, fieldSize, seconds);
  }

  configureView(gameName, fieldSize, seconds) {
    const close = new NodeCreator({
      tag: 'button',
      css: ['close', 'greeting__close'],
      callback: () => this.viewNode.removeNode(),
    });
    const text = new NodeCreator({
      tag: 'p',
      css: ['greeting__text'],
      text: `Great! You have solved the ${fieldSize}x${fieldSize} ${gameName} nonogram in ${seconds} seconds!`,
    });
    this.viewNode.addInnerNode(close, text);
    document.body.append(this.viewNode.getNode());
    this.saveResult(gameName, `${fieldSize}x${fieldSize}`, seconds);
    this.#observer.subscribe(ObserverActions.closeGreeting, () =>
      this.viewNode.removeNode()
    );
  }

  saveResult(gameName, fieldSize, seconds) {
    const resultFromLs =
      JSON.parse(localStorage.getItem('nonogram-result')) || [];
    resultFromLs.push({ gameName, fieldSize, seconds });
    localStorage.setItem(
      'nonogram-result',
      JSON.stringify(resultFromLs.slice(-5))
    );
  }
}
