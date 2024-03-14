import './menuView.scss';
import NodeParams from '../../interfaces/NodeParams';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';
import { WordCollection } from '../../interfaces/WordCollection';

const nodesData: Record<string, NodeParams> = {
  logOut: {
    tag: 'button',
    css: ['header__button'],
    text: 'logout',
  },
  showTranslationHint: {
    tag: 'button',
    css: ['header__button', 'translation-button'],
    text: 'text hint',
  },
  showAudioHint: {
    tag: 'button',
    css: ['header__button', 'audio-button'],
    text: 'audio hint',
  },
  showPuzzleBg: {
    tag: 'button',
    css: ['header__button', 'puzzle-bg-button'],
    text: 'showPuzzleBg',
  },
};

export default class MenuView extends View {
  constructor(private collection: WordCollection[]) {
    super({
      tag: 'div',
      css: ['menu'],
    });
    this.render();
  }

  private render() {
    const closeMenu = new NodeCreator({
      tag: 'button',
      css: ['menu-close'],
      text: 'close-menu',
      callback: () => this.viewCreator.remove(),
    });
    const container = new NodeCreator({
      tag: 'div',
      css: ['menu-container'],
    });
    container.addInnerNode(
      this.translationHint(),
      this.audioHint(),
      this.backgroundHint(),
      this.addDifficultySelector()
    );
    this.addNodeInside(container, closeMenu);
  }

  private translationHint() {
    const btn = new NodeCreator({
      ...nodesData.showTranslationHint,
      callback: () => this.state.next('showTranslationHint', (v) => !v),
    });
    btn.setAttribute('Show translation hint', 'title');
    this.state.subscribe(btn, 'showTranslationHint', (v) =>
      v ? btn.removeCLassName('translation-button_active') : btn.addClassName('translation-button_active')
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
      v ? btn.removeCLassName('audio-button_active') : btn.addClassName('audio-button_active')
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
      v ? btn.removeCLassName('puzzle-bg-button_active') : btn.addClassName('puzzle-bg-button_active')
    );
    return btn;
  }

  private addDifficultySelector() {
    const container = new NodeCreator({
      tag: 'div',
      css: ['difficulty-selector'],
    });
    const levelContainer = new NodeCreator({
      tag: 'div',
      css: ['level-selector'],
    });
    const roundContainer = new NodeCreator({
      tag: 'div',
      css: ['round-selector'],
    });
    let completedGames = {};
    this.state.subscribe(container, 'completedGames', (v) => {
      completedGames = v || {};
    });
    this.collection.forEach((diff, i) => {
      const btn = new NodeCreator({
        tag: 'button',
        text: `${i + 1}`,
        callback: () => this.addRoundSelector(this.collection[i], i, completedGames, roundContainer),
      });
      levelContainer.addInnerNode(btn);
    });
    container.addInnerNode(levelContainer, roundContainer);

    this.state.subscribe(this.viewCreator, 'gameDifficulty', (v) => {
      if (typeof v === 'number') {
        if (v > this.collection.length - 1) return;
        this.addRoundSelector(this.collection[v], v, completedGames, roundContainer);
      }
    });
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
        },
      });
      if (completedRounds.has(i)) {
        btn.addClassName('round-button_completed');
      }
      container.addInnerNode(btn);
    });
  }
}
