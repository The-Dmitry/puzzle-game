import './FieldView.scss';
import View from '../../../classes/View';
import FieldCellView from './FieldCellView';

export default class FieldView extends View {
  playArea = [];

  scheme;

  constructor() {
    const params = {
      tag: 'div',
      css: ['field', 'puzzle__item'],
    };
    super(params);
    this.configureView();
  }

  configureView() {}

  generateField(scheme) {
    this.scheme = scheme;
    const btns = scheme.map((arr) =>
      arr.map((info) => new FieldCellView(info, this.isVictory.bind(this)))
    );
    this.playArea = btns.flat(5).filter((btn) => btn.needPaint);
    btns.forEach((arr) => this.addViewInside(...arr));
    // console.log(this.scheme);
    console.log(this.playArea);
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
}
