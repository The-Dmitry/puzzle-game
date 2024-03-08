import './gameView.scss';
import View from '../../common/view/VIew';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import { Round, WordCollection } from '../../../interfaces/WordCollection';
import PuzzleItemView from './puzzleItem/PuzzleItemView';
import PuzzleRowView from './puzzleRow/PuzzleRowView';
import GameControlsView from './gameControls/GameControlsView';

export default class GameView extends View {
  private allPuzzles: View[] = [];

  private allRowsBlock = new NodeCreator({
    tag: 'div',
    css: ['all-rows'],
  });

  private puzzleRows: PuzzleRowView[] = [];

  private round = 0;

  private level = -1;

  private startBlock = new NodeCreator({
    tag: 'div',
    css: ['start-zone', 'puzzle-row'],
  });

  private resultBlock: PuzzleRowView | null = null;

  private currentSentence: string[] = [];

  constructor(private gameData: WordCollection) {
    super({ tag: 'div', css: ['game', 'drag-area'] });
    this.render();
    this.state.subscribe(this.viewCreator, 'nextLevel', () => this.nextLevel());
  }

  private render() {
    this.createPuzzleRows();
    this.addNodeInside(
      this.allRowsBlock,
      this.startBlock,
      new GameControlsView(() => this.checkSentence()).viewCreator
    );
  }

  private createPuzzleRows() {
    this.gameData.rounds[this.round].words.forEach(() => {
      const row = new PuzzleRowView();
      this.puzzleRows.push(row);
      this.allRowsBlock.addInnerNode(row.viewCreator);
      // this.puzzleRows[this.round].makeActive(true);
    });
  }

  private createPuzzleItems(roundData: Round = this.gameData.rounds[this.round]) {
    const level = roundData.words[this.level];
    this.currentSentence = level.textExample.split(' ');
    const defaultWidth = 100 / level.textExample.replaceAll(' ', '').length;
    let bgShift = 0;
    this.currentSentence.forEach((word) => {
      const width = defaultWidth * word.length;
      const item = new PuzzleItemView(word, width, bgShift, (node) => this.moveItemBetweenRows(node));
      bgShift += width;
      this.startBlock.addInnerNode(item.viewCreator);
      this.allPuzzles.push(item);
    });
  }

  private nextLevel() {
    this.level += 1;
    if (this.level > 9) {
      this.nextRound();
    }
    console.log(this.level);
    this.resultBlock = this.puzzleRows[this.level];
    this.createPuzzleItems();
    this.state.next('checkSentence', () => undefined);
  }

  private nextRound() {
    this.allPuzzles.forEach((puzzle) => puzzle.remove());
    this.round += 1;
    this.level = 0;
  }

  private moveItemBetweenRows(node: Element) {
    if ([...this.startBlock.node.children].some((elem) => elem === node)) {
      this.resultBlock?.viewCreator.node.append(node);
    } else {
      this.startBlock.node.append(node);
    }
    this.isStartBLockEmpty();
  }

  private isStartBLockEmpty() {
    const isEmpty = this.startBlock.node.children.length;
    this.state.next('checkSentence', () => (!isEmpty ? true : undefined));
  }

  private checkSentence() {
    const children = this.resultBlock?.viewCreator.node.children;
    if (!children?.length) return false;
    for (let i = 0; i < this.currentSentence.length; i += 1) {
      if (!children[i]) return false;
      if (this.currentSentence[i] !== children[i].textContent) {
        return false;
      }
    }
    return true;
  }
}
