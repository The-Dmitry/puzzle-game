import './gameView.scss';
import View from '../../common/view/VIew';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import { Round, WordCollection } from '../../../interfaces/WordCollection';
import PuzzleItemView from './puzzleItem/PuzzleItemView';
import PuzzleRowView from './puzzleRow/PuzzleRowView';
import GameControlsView from './gameControls/GameControlsView';
import NodeParams from '../../../interfaces/NodeParams';

const nodesData: Record<string, NodeParams> = {
  placeholder: {
    tag: 'div',
    css: ['placeholder'],
  },
  allRowsBlock: {
    tag: 'div',
    css: ['all-rows'],
  },
  startBlock: {
    tag: 'div',
    css: ['start-zone', 'puzzle-row', 'puzzle-row_active'],
  },
};

export default class GameView extends View {
  private allRowsBlock = new NodeCreator({ ...nodesData.allRowsBlock });

  private startBlock = new NodeCreator({ ...nodesData.startBlock });

  private placeHolder = new NodeCreator({ ...nodesData.placeholder });

  private allPuzzles: PuzzleItemView[] = [];

  private puzzleRows: PuzzleRowView[] = [];

  private currentLvlPuzzles: PuzzleItemView[] = [];

  private resultBlock: PuzzleRowView | null = null;

  private currentSentence: string[] = [];

  private round = 0;

  private level = -1;

  constructor(private gameData: WordCollection) {
    super({ tag: 'div', css: ['game', 'drag-area'] });
    this.render();
    this.state.subscribe(this.viewCreator, 'nextLevel', () => this.nextLevel());
    this.state.subscribe(this.viewCreator, 'afterItemMoving', () => this.isStartBLockEmpty());
  }

  private render() {
    this.createPuzzleRows();
    this.addNodeInside(
      this.allRowsBlock,
      this.startBlock,
      new GameControlsView(
        () => this.checkSentence(),
        () => this.autoComplete()
      ).viewCreator
    );
  }

  private createPuzzleRows() {
    this.gameData.rounds[this.round].words.forEach(() => {
      const row = new PuzzleRowView();
      this.puzzleRows.push(row);
      this.allRowsBlock.addInnerNode(row.viewCreator);
    });
  }

  private createPuzzleItems(roundData: Round = this.gameData.rounds[this.round]) {
    const level = roundData.words[this.level];
    this.currentSentence = level.textExample.split(' ');
    const defaultWidth = 100 / level.textExample.replaceAll(' ', '').length;
    let bgShift = 0;
    this.currentSentence.forEach((word) => {
      const width = defaultWidth * word.length;
      const item = new PuzzleItemView(
        word,
        width,
        bgShift,
        this.level,
        roundData.levelData.imageSrc,
        (node) => this.moveItemBetweenRows(node),
        this.placeHolder
      );
      bgShift += width;
      this.allPuzzles.push(item);
      this.currentLvlPuzzles.push(item);
    });
    [...this.currentLvlPuzzles]
      .sort(() => 0.5 - Math.random())
      .forEach((puzzle) => this.startBlock.addInnerNode(puzzle.viewCreator));
  }

  private nextLevel() {
    this.level += 1;
    if (this.level > 9) {
      this.nextRound();
    }
    this.allPuzzles.forEach((puzzle) => puzzle.makeItemInactive());
    this.makeActiveRow();
    this.currentLvlPuzzles = [];
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
    console.log('correct sentence');
    return true;
  }

  private autoComplete() {
    if (this.currentLvlPuzzles.length) {
      this.currentLvlPuzzles.forEach((puzzle) => puzzle.autocomplete(this.resultBlock?.viewCreator.node));
    }
  }

  private makeActiveRow() {
    this.puzzleRows.forEach((row, i) => row.makeActive(i === this.level));
  }
}
