import './NewGameView.scss';
import NodeCreator from '../../../classes/NodeCreator';
import View from '../../../classes/View';

const MODE = ['5x5', '10x10', '15x15'];

export default class NewGameView extends View {
  constructor(gameData, startNewGame) {
    const params = {
      tag: 'div',
      css: ['new-game'],
    };
    super(params);
    // console.log(gameData);
    this.configureView(gameData, startNewGame);
  }

  configureView(gameData, startNewGame) {
    const title = new NodeCreator({
      tag: 'h2',
      css: ['new-game__title'],
      text: 'New Game',
    });
    const categoryNodes = Object.entries(gameData).map(([_, list]) =>
      this.generateCategory(list, startNewGame)
    );

    this.viewNode.addInnerNode(title, ...categoryNodes);
  }

  generateCategory(list, startNewGame) {
    const modeList = Object.entries(list);
    const mode = modeList[0][1][0].length;
    const container = new NodeCreator({
      tag: 'div',
      css: ['new-game__container'],
    });
    const subtitle = new NodeCreator({
      tag: 'h3',
      css: ['new-game__subtitle'],
      text: `${mode}x${mode}`,
    });
    const buttonList = modeList.map(
      ([gameName, val]) =>
        new NodeCreator({
          tag: 'button',
          css: ['new-game__button'],
          text: `${gameName}`,
          callback: () => startNewGame(val, gameName),
        })
    );
    container.addInnerNode(subtitle, ...buttonList);
    return container;
  }
}
