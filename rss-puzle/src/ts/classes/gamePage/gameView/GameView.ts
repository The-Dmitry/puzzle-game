import './gameView.scss';
import View from '../../common/view/VIew';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import { Round } from '../../../interfaces/WordCollection';
import PuzzleItemView from './puzzleItem/PuzzleItemView';
import PuzzleRowView from './puzzleRow/PuzzleRowView';
import GameControlsView from './gameControls/GameControlsView';
import NodeParams from '../../../interfaces/NodeParams';
import AudioHintView from '../audioHintView.ts/AudioHintView';

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
  translationHint: {
    tag: 'p',
    css: ['translation-hint'],
  },
};

export default class GameView extends View {
  private translationHint = new NodeCreator({ ...nodesData.translationHint });

  private audioHint = new AudioHintView();

  private allRowsBlock = new NodeCreator({ ...nodesData.allRowsBlock });

  private startBlock = new NodeCreator({ ...nodesData.startBlock });

  private placeHolder = new NodeCreator({ ...nodesData.placeholder });

  private allPuzzles: PuzzleItemView[] = [];

  private puzzleRows: PuzzleRowView[] = [];

  private currentLvlPuzzles: PuzzleItemView[] = [];

  private resultBlock: PuzzleRowView | null = null;

  private currentSentence: string[] = [];

  private level = -1;

  constructor(private gameData: Round) {
    super({ tag: 'div', css: ['game', 'drag-area'] });
    this.render();
    this.state.subscribe(this.viewCreator, 'nextLevel', () => this.nextLevel());
    this.state.subscribe(this.viewCreator, 'afterItemMoving', () => this.isStartBLockEmpty(), false).next(() => true);
    this.state.subscribe(this.viewCreator, 'showTranslationHint', (show) =>
      show ? this.translationHint.remove() : this.addNodeInside(this.translationHint)
    );
    this.state.subscribe(this.viewCreator, 'showAudioHint', (show) =>
      show ? this.audioHint.remove() : this.addNodeInside(this.audioHint)
    );
    this.state.next('unresolvedSentences', () => []);
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
    this.gameData.words.forEach(() => {
      const row = new PuzzleRowView();
      this.puzzleRows.push(row);
      this.allRowsBlock.addInnerNode(row.viewCreator);
    });
  }

  private createPuzzleItems(roundData: Round = this.gameData) {
    const level = roundData.words[this.level];
    this.translationHint.setTextContent(level.textExampleTranslate);
    this.audioHint.setAudioSrc = level.audioExample;
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
    if (this.level > 9) return;
    this.currentLvlPuzzles = [];
    this.allPuzzles.forEach((puzzle) => puzzle.makeItemInactive());
    this.makeActiveRow();
    this.resultBlock = this.puzzleRows[this.level];
    this.createPuzzleItems();
    this.state.next('checkSentence', () => true);
    this.state.next('showTranslationHint', (v) => v);
  }

  private moveItemBetweenRows(node: Element) {
    if ([...this.startBlock.node.children].some((elem) => elem === node)) {
      this.resultBlock?.viewCreator.node.append(node);
    } else {
      this.startBlock.node.append(node);
    }
  }

  private isStartBLockEmpty() {
    const isEmpty = this.startBlock.node.children.length;
    this.state.next('checkSentence', () => !!isEmpty);
  }

  private checkSentence() {
    const children = this.resultBlock?.viewCreator.node.children;
    if (!children?.length) return false;
    let result = true;
    this.currentSentence.forEach((word, index) => {
      if (word !== children[index].textContent) {
        result = false;
        children[index].classList.add('puzzle-item_incorrect');
      } else {
        children[index].classList.add('puzzle-item_correct');
      }
      (children[index] as HTMLElement).addEventListener('animationend', () => {
        children[index].classList.remove('puzzle-item_correct');
        children[index].classList.remove('puzzle-item_incorrect');
      });
    });
    if (!result) {
      return result;
    }
    this.state.next('blockStupidButton', () => true);
    if (this.level >= 9) {
      this.state.next('addNextRoundButton', () => true);
      this.state.next('saveCompletedGame', (v) => v);
    }
    this.currentLvlPuzzles.forEach((puzzle) => puzzle.autocomplete(this.resultBlock?.viewCreator.node));
    this.addNodeInside(this.translationHint);
    return result;
  }

  private autoComplete() {
    if (this.currentLvlPuzzles.length) {
      this.currentLvlPuzzles.forEach((puzzle) => puzzle.autocomplete(this.resultBlock?.viewCreator.node));
      this.state.next('unresolvedSentences', (v) => (v ? [...v, this.level] : []));
      if (this.level >= 9) {
        this.state.next('addNextRoundButton', () => true);
        this.state.next('saveCompletedGame', (v) => v);
      }
      this.addNodeInside(this.translationHint);
    }
  }

  private makeActiveRow() {
    this.puzzleRows.forEach((row, i) => row.makeActive(i === this.level));
  }
}
