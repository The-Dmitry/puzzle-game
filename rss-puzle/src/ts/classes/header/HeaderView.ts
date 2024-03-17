import './headerView.scss';
import NodeParams from '../../interfaces/NodeParams';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';

const nodesData: Record<string, NodeParams> = {
  logOut: {
    tag: 'button',
    css: ['header__button', 'logout-button'],
  },
  burger: {
    tag: 'button',
    css: ['header__button', 'burger-button'],
  },
  showTranslationHint: {
    tag: 'button',
    css: ['header__button', 'translation-button'],
    text: 'text hint',
  },
};

export default class HeaderView extends View {
  constructor() {
    super({
      tag: 'header',
      css: ['header'],
    });
    this.render();
  }

  private render() {
    let diff = 0;
    let round = 0;
    const currentLvlAndRound = new NodeCreator({
      tag: 'p',
      css: ['mode'],
    });
    this.state.subscribe(this.viewCreator, 'gameDifficulty', (v) => {
      diff = typeof v === 'number' ? v : 0;
      currentLvlAndRound.setTextContent(`Level: ${diff + 1}   Round: ${round + 1}`);
    });
    this.state.subscribe(this.viewCreator, 'gameRound', (v) => {
      round = typeof v === 'number' ? v : 0;
      currentLvlAndRound.setTextContent(`Level: ${diff + 1}   Round: ${round + 1}`);
    });
    this.addNodeInside(this.logoutBtn(), currentLvlAndRound, this.toggleBurgerMenu());
  }

  private logoutBtn() {
    const logOut = new NodeCreator({
      ...nodesData.logOut,
      callback: () => this.state.next('loginData', () => null),
    });
    logOut.setAttribute('Logout', 'title');
    return logOut;
  }

  private toggleBurgerMenu() {
    const burger = new NodeCreator({
      ...nodesData.burger,
      callback: () => this.state.next('toggleBurgerMenu', (v) => !!v),
    });
    const span = new NodeCreator({
      tag: 'span',
    });
    burger.addInnerNode(span);
    return burger;
  }
}
