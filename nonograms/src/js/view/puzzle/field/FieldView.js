import './FieldView.scss';
import View from '../../../classes/View';
import FieldCellView from './FieldCellView';

export default class FieldView extends View {
  playArea = [];

  scheme;

  constructor() {
    const params = {
      tag: 'div',
      css: ['field', 'field_10', 'puzzle__item'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}

  generateField(scheme) {
    console.log(scheme);
    // this.scheme = scheme;
    const btns = scheme.map((arr) =>
      arr.map((info) => new FieldCellView(info, this.isVictory.bind(this)))
    );
    this.playArea = btns.flat(5).filter((btn) => btn.needPaint);
    btns.forEach((arr) => this.addViewInside(...arr));
    // this.setSize();
  }

  isVictory() {
    for (let i = 0; i < this.playArea.length; i += 1) {
      if (!this.playArea[i].isMarkedCorrectly()) {
        console.log('NOT WIN');
        return false;
      }
    }
    console.log('WIN');
    return true;
  }

  setSize() {
    window.addEventListener('DOMContentLoaded', () => {
      console.log(this.playArea[0].getElement().offsetWidth);
      document.body.style.setProperty(
        '--test',
        `${this.playArea[0].getElement().offsetWidth}px`
      );
    });
    window.addEventListener('resize', () => {
      document.body.style.setProperty(
        '--test',
        `${this.playArea[0].getElement().offsetWidth}px`
      );
      console.log(this.playArea[0].getElement().offsetWidth);
    });
  }
}
