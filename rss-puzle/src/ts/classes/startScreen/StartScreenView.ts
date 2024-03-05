import './startScreen.scss';
import NodeParams from '../../interfaces/NodeParams';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';

const nodesData: Record<string, NodeParams> = {
  container: {
    tag: 'div',
    css: ['start-screen__container'],
  },
  greeting: {
    tag: 'h1',
    css: ['start-screen__greeting'],
    text: 'adsdas',
  },
  startBtn: {
    tag: 'button',
    css: ['start-screen__start'],
    text: 'start',
  },
  logOutBtn: {
    tag: 'button',
    css: ['start-screen__log-out'],
    text: 'log out',
  },
};

export default class StartScreenView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['start-screen'],
    });
    this.render();
  }

  private render() {
    const container = new NodeCreator({ ...nodesData.container });
    const greeting = new NodeCreator({ ...nodesData.greeting });
    const startBtn = new NodeCreator({ ...nodesData.startBtn });
    const logOutBtn = new NodeCreator({
      ...nodesData.logOutBtn,
      callback: () => this.state.next('loginData', () => undefined),
    });
    container.addInnerNode(greeting, startBtn, logOutBtn);
    this.viewNode.addInnerNode(container);

    this.state.subscribe(this.viewNode, 'loginData', (data) => {
      greeting.setTextContent(`Hello, ${data?.join(' ')}`);
    });
  }
}
