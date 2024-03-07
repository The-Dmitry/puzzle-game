import './gameView.scss';
import View from '../../common/view/VIew';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import { Round, WordCollection } from '../../../interfaces/WordCollection';
import PuzzleItemView from './puzzleItem/PuzzleItemView';
import PuzzleRowView from './puzzleRow/PuzzleRowView';

export default class GameView extends View {
  private allPuzzles: View[] = [];

  private allRowsBlock = new NodeCreator({
    tag: 'div',
    css: ['all-rows'],
  });

  private puzzleRows: PuzzleRowView[] = [];

  private round = 0;

  private level = 0;

  private startBlock = new NodeCreator({
    tag: 'div',
    css: ['start-zone', 'puzzle-row'],
  });

  private resultBlock: PuzzleRowView | null = null;

  constructor(private gameData: WordCollection) {
    super({ tag: 'div', css: ['game', 'drag-area'] });
    this.render();
  }

  private render() {
    this.createPuzzleRows();
    this.addNodeInside(this.allRowsBlock, this.startBlock);
    this.createPuzzleItems(this.gameData.rounds[this.round]);
  }

  private createPuzzleRows() {
    this.gameData.rounds[this.round].words.forEach(() => {
      const row = new PuzzleRowView();
      this.puzzleRows.push(row);
      this.allRowsBlock.addInnerNode(row.viewCreator);
      this.puzzleRows[this.round].makeActive(true);
      this.resultBlock = this.puzzleRows[this.round];
    });
  }

  private createPuzzleItems(roundData: Round) {
    const level = roundData.words[this.level];
    const defaultWidth = 100 / level.textExample.replaceAll(' ', '').length;
    let bgShift = 0;
    level.textExample.split(' ').forEach((word) => {
      const width = defaultWidth * word.length;
      const item = new PuzzleItemView(word, width, bgShift, (node) => this.moveItemBetweenRows(node));
      bgShift += width;
      this.startBlock.addInnerNode(item.viewCreator);
      this.allPuzzles.push(item);
    });
  }

  private moveItemBetweenRows(node: Element) {
    if ([...this.startBlock.node.children].some((elem) => elem === node)) {
      this.resultBlock?.viewCreator.node.append(node);
      return;
    }
    this.startBlock?.node.append(node);
  }
}
