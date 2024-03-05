// import NodeParams from '../../interfaces/NodeParams';
import View from '../common/view/VIew';

// const nodesData: Record<string, NodeParams> = {
//   container: {
//     tag: 'div',
//     css: ['start-screen__container'],
//   },
// };

export default class GamePageView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['game-page'],
    });
  }
}
