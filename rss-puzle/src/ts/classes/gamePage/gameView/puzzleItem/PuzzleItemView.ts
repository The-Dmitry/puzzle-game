import View from '../../../common/view/VIew';

export default class PuzzleItemView extends View {
  constructor(text: string, itemWidth: number, bgShift: number, callback: (node: Element) => void) {
    super({
      tag: 'div',
      css: ['puzzle-item'],
      text,
      callback: () => callback(this.viewCreator.node),
    });
    this.viewCreator.node.style.setProperty('--width', `${itemWidth.toFixed(2)}`);
    this.viewCreator.node.style.setProperty('--bgShift', `${bgShift.toFixed(2)}`);
  }
}
