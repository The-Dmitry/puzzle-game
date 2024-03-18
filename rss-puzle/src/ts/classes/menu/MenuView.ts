import './menuView.scss';
import NodeParams from '../../interfaces/NodeParams';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';
import { WordCollection } from '../../interfaces/WordCollection';

const nodesData: Record<string, NodeParams> = {
  logOut: {
    tag: 'button',
    css: ['menu__button'],
    text: 'logout',
  },
  showTranslationHint: {
    tag: 'button',
    css: ['menu__button', 'translation-button'],
  },
  showAudioHint: {
    tag: 'button',
    css: ['menu__button', 'audio-button'],
  },
  showPuzzleBg: {
    tag: 'button',
    css: ['menu__button', 'puzzle-bg-button'],
  },
  closeMenu: {
    tag: 'button',
    css: ['menu-close'],
  },
  levelTitle: {
    tag: 'p',
    css: ['menu-title'],
    text: 'Levels',
  },
  roundTitle: {
    tag: 'p',
    css: ['menu-title'],
    text: 'Rounds',
  },
  levelContainer: {
    tag: 'div',
    css: ['level-selector'],
  },
  roundContainer: {
    tag: 'div',
    css: ['round-selector'],
  },
  diffContainer: {
    tag: 'div',
    css: ['difficulty-selector'],
  },
};

export default class MenuView extends View {
  constructor(private collection: WordCollection[]) {
    super({
      tag: 'div',
      css: ['menu', 'menu_open-animation'],
    });
    this.viewCreator.setCallback(() => {
      this.viewCreator.removeCLassName('menu_open-animation');
    }, 'animationend');
    this.render();
    document.body.classList.add('block');
    this.state.subscribe(this.viewCreator, 'closeBurger', () => this.closeMenu(), false);
  }

  private render() {
    const closeMenu = new NodeCreator({ ...nodesData.closeMenu, callback: () => this.closeMenu() });
    this.addNodeInside(
      this.translationHint(),
      this.audioHint(),
      this.backgroundHint(),
      this.addDifficultySelector(),
      closeMenu
    );
  }

  private closeMenu() {
    document.body.classList.remove('block');
    this.viewCreator.addClassName('menu_close-animation');
    this.viewCreator.setCallback(() => {
      this.viewCreator.remove();
    }, 'animationend');
  }

  private translationHint() {
    const btn = new NodeCreator({
      ...nodesData.showTranslationHint,
      callback: () => this.state.next('showTranslationHint', (v) => !v),
    });
    btn.setAttribute('Show translation hint', 'title');
    this.state.subscribe(btn, 'showTranslationHint', (v) =>
      v ? btn.removeCLassName('menu-button_active') : btn.addClassName('menu-button_active')
    );
    return btn;
  }

  private audioHint() {
    const btn = new NodeCreator({
      ...nodesData.showAudioHint,
      callback: () => this.state.next('showAudioHint', (v) => !v),
    });
    btn.setAttribute('Show audio hint', 'title');
    this.state.subscribe(btn, 'showAudioHint', (v) =>
      v ? btn.removeCLassName('menu-button_active') : btn.addClassName('menu-button_active')
    );
    return btn;
  }

  private backgroundHint() {
    const btn = new NodeCreator({
      ...nodesData.showPuzzleBg,
      callback: () => this.state.next('showPuzzleBg', (v) => !v),
    });
    btn.setAttribute('Enable or disable background image hint', 'title');
    this.state.subscribe(btn, 'showPuzzleBg', (v) =>
      v ? btn.removeCLassName('menu-button_active') : btn.addClassName('menu-button_active')
    );
    return btn;
  }

  private addDifficultySelector() {
    const container = new NodeCreator({ ...nodesData.diffContainer });
    const levelTitle = new NodeCreator({ ...nodesData.levelTitle });
    const roundTitle = new NodeCreator({ ...nodesData.roundTitle });
    const levelContainer = new NodeCreator({ ...nodesData.levelContainer });
    const roundContainer = new NodeCreator({ ...nodesData.roundContainer });
    let completedGames = {};
    this.state.subscribe(container, 'completedGames', (v) => {
      completedGames = v || {};
    });
    const diffBtns: NodeCreator[] = [];
    this.collection.forEach((diff, i) => {
      const btn = new NodeCreator({
        tag: 'button',
        css: ['difficulty-button'],
        text: `${i + 1}`,
      });
      btn.setCallback(() => {
        [...levelContainer.node.children].forEach((button) => button.classList.remove('difficulty-button__active'));
        btn.addClassName('difficulty-button__active');
        this.addRoundSelector(this.collection[i], i, completedGames, roundContainer);
      });
      diffBtns.push(btn);
    });
    levelContainer.addInnerNode(...diffBtns);
    this.state.subscribe(this.viewCreator, 'gameDifficulty', (v) => {
      if (typeof v === 'number') {
        if (v > this.collection.length - 1) return;
        diffBtns[v].addClassName('difficulty-button__active');
        this.addRoundSelector(this.collection[v], v, completedGames, roundContainer);
      }
    });
    container.addInnerNode(levelTitle, levelContainer, roundTitle, roundContainer);
    return container;
  }

  private addRoundSelector(
    levelData: WordCollection,
    level: number,
    completedGames: Record<string, number[]>,
    container: NodeCreator
  ) {
    const completedRounds = new Set(completedGames[level]);

    container.removeAllChildren();
    levelData.rounds.forEach((_, i) => {
      const btn = new NodeCreator({
        tag: 'button',
        text: `${i + 1}`,
        css: ['round-button'],
        callback: () => {
          this.state.next('gameDifficulty', () => level);
          this.state.next('gameRound', () => i);
          this.closeMenu();
        },
      });
      if (completedRounds.has(i)) {
        btn.addClassName('round-button_completed');
      }
      container.addInnerNode(btn);
    });
  }
}
