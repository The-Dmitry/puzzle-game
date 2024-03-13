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
    const logOut = new NodeCreator({
      ...nodesData.logOut,
      callback: () => this.state.next('loginData', () => null),
    });
    const showTranslationHint = new NodeCreator({
      ...nodesData.showTranslationHint,
      callback: () => this.state.next('showTranslationHint', (v) => !v),
    });
    this.addNodeInside(logOut, showTranslationHint);
    this.state.subscribe(showTranslationHint, 'showTranslationHint', (v) => {
      if (v) {
        showTranslationHint.addClassName('translation-button_active');
        return;
      }
      showTranslationHint.removeCLassName('translation-button_active');
    });
  }
}
