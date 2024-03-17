import './startScreen.scss';
import NodeParams from '../../interfaces/NodeParams';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';

const nodesData: Record<string, NodeParams> = {
  container: {
    tag: 'div',
    css: ['start-screen__container'],
  },
  title: {
    tag: 'h1',
    css: ['start-screen__title'],
    text: 'english puzzle',
  },
  greeting: {
    tag: 'h2',
    css: ['start-screen__greeting'],
  },
  description: {
    tag: 'p',
    css: ['start-screen__description'],
    text: 'Click on words, collect phrases. You can drag and drop words. Select tooltip in the menu',
  },
  startBtn: {
    tag: 'button',
    css: ['start-screen-button', 'start-screen-button__start'],
    text: 'start',
  },
  logOutBtn: {
    tag: 'button',
    css: ['start-screen-button', 'start-screen-button__log-out'],
    text: 'log out',
  },
};

export default class StartScreenView extends View {
  constructor(renderGamePage: () => void) {
    super({
      tag: 'div',
      css: ['start-screen'],
    });
    this.render(renderGamePage);
  }

  private render(renderGamePage: () => void) {
    const container = new NodeCreator({ ...nodesData.container });
    const title = new NodeCreator({ ...nodesData.title });
    const description = new NodeCreator({ ...nodesData.description });
    const greeting = new NodeCreator({ ...nodesData.greeting });
    const startBtn = new NodeCreator({ ...nodesData.startBtn, tag: 'button', callback: () => renderGamePage() });
    const logOutBtn = new NodeCreator({
      ...nodesData.logOutBtn,
      callback: () => this.state.next('loginData', () => null),
    });

    container.addInnerNode(title, greeting, description, startBtn, logOutBtn);
    this.viewCreator.addInnerNode(container);

    this.state.subscribe(this.viewCreator, 'loginData', (data) => {
      greeting.setTextContent(`Hello, ${data?.join(' ')}!`);
    });
    this.state.subscribe(this.viewCreator, 'collectionLoaded', (v) => {
      startBtn.node.disabled = !v;
    });
  }
}
