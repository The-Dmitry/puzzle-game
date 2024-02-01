import './settingsView.scss';
import NodeCreator from '../../../classes/NodeCreator';
import View from '../../../classes/View';
import Observer from '../../../classes/observer/Observer';
import ObserverActions from '../../../classes/observer/observerActions';

export default class SettingsView extends View {
  resultNode = null;

  #darkMode = false;

  #observer = Observer.getInstance();

  constructor() {
    const params = {
      tag: 'div',
      css: ['settings'],
    };
    super(params);
    window.addEventListener('load', () => {
      this.#darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
      this.switchDarkMode();
      this.configureView();
    });
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('darkMode', JSON.stringify(this.#darkMode));
    });
  }

  configureView() {
    const label = new NodeCreator({
      tag: 'label',
      css: ['result__label'],
    });
    const theme = new NodeCreator({
      tag: 'input',
      css: ['result__input'],
      type: 'checkbox',
      callback: () => this.handleDarkMode(theme),
    });
    label.addInnerNode(theme);
    theme.getNode().checked = this.#darkMode;
    const score = new NodeCreator({
      tag: 'button',
      css: ['result__button'],
      text: 'score',
      callback: () => {
        if (this.resultNode) {
          this.resultNode.removeNode();
        }
        this.showBestResult();
      },
    });
    this.viewNode.addInnerNode(label, score);
  }

  showBestResult() {
    const resultNode = new NodeCreator({
      tag: 'div',
      css: ['result'],
    });
    this.resultNode = resultNode;
    const closeResult = new NodeCreator({
      tag: 'button',
      css: ['close'],
      callback: () => {
        this.#observer.dispatch(ObserverActions.blockField);
        resultNode.removeNode();
      },
    });
    const resultFromLs =
      JSON.parse(localStorage.getItem('nonogram-result')) || [];
    const list = this.generateResultList(resultFromLs);
    resultNode.addInnerNode(closeResult, list);
    document.body.append(resultNode.getNode());
    this.#observer.dispatch(ObserverActions.blockField, true);
  }

  generateResultList(list) {
    if (!list.length) {
      return new NodeCreator({
        tag: 'p',
        text: 'List is empty',
      });
    }
    const listNode = new NodeCreator({
      tag: 'ul',
      css: ['result__list'],
    });
    listNode.addInnerNode(
      this.generateHead('№', 'Name', 'Mode', 'Time'),
      ...list.map((item, index) =>
        this.generateResultRow(index + 1, ...Object.values(item))
      )
    );
    return listNode;
  }

  generateResultRow(...items) {
    const props = items;
    props[props.length - 1] = `${new Date(props[props.length - 1] * 1000)
      .toISOString()
      .slice(14, 19)}`;
    const row = new NodeCreator({
      tag: 'li',
      css: ['result-item'],
    });
    const rowItems = items.map(
      (text) =>
        new NodeCreator({
          tag: 'p',
          css: ['result-item__text'],
          text,
        })
    );
    row.addInnerNode(...rowItems);
    return row;
  }

  generateHead(...items) {
    const row = new NodeCreator({
      tag: 'li',
      css: ['result-item'],
    });
    const rowItems = items.map(
      (text) =>
        new NodeCreator({
          tag: 'p',
          css: ['result-item__text'],
          text,
        })
    );
    row.addInnerNode(...rowItems);
    return row;
  }

  handleDarkMode(checkbox) {
    const node = checkbox;
    this.#darkMode = !this.#darkMode;
    node.getNode().checked = this.#darkMode;
    this.switchDarkMode();
  }

  switchDarkMode() {
    if (this.#darkMode) {
      document.body.classList.add('dark');
      return;
    }
    document.body.classList.remove('dark');
  }
}
