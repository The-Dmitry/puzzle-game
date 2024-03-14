import './headerView.scss';
import NodeParams from '../../interfaces/NodeParams';
import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/VIew';

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
    this.addNodeInside(this.logoutBtn(), this.toggleBurgerMenu(), currentLvlAndRound);
  }

  private logoutBtn() {
    return new NodeCreator({
      ...nodesData.logOut,
      callback: () => this.state.next('loginData', () => null),
    });
  }

  private toggleBurgerMenu() {
    return new NodeCreator({
      ...nodesData.logOut,
      text: 'burger',
      callback: () => this.state.next('toggleBurgerMenu', (v) => !!v),
    });
  }

  // private translationHint() {
  //   const btn = new NodeCreator({
  //     ...nodesData.showTranslationHint,
  //     callback: () => this.state.next('showTranslationHint', (v) => !v),
  //   });
  //   btn.setAttribute('Show translation hint', 'title');
  //   this.state.subscribe(btn, 'showTranslationHint', (v) =>
  //     v ? btn.addClassName('translation-button_active') : btn.removeCLassName('translation-button_active')
  //   );
  //   return btn;
  // }

  // private audioHint() {
  //   const btn = new NodeCreator({
  //     ...nodesData.showAudioHint,
  //     callback: () => this.state.next('showAudioHint', (v) => !v),
  //   });
  //   btn.setAttribute('Show audio hint', 'title');
  //   this.state.subscribe(btn, 'showAudioHint', (v) =>
  //     v ? btn.addClassName('audio-button_active') : btn.removeCLassName('audio-button_active')
  //   );
  //   return btn;
  // }

  // private backgroundHint() {
  //   const btn = new NodeCreator({
  //     ...nodesData.showPuzzleBg,
  //     callback: () => this.state.next('showPuzzleBg', (v) => !v),
  //   });
  //   btn.setAttribute('Enable or disable background image hint', 'title');
  //   this.state.subscribe(btn, 'showPuzzleBg', (v) =>
  //     v ? btn.addClassName('puzzle-bg-button_active') : btn.removeCLassName('puzzle-bg-button_active')
  //   );
  //   return btn;
  // }
}
