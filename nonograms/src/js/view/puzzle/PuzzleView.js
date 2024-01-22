import './PuzzleView.scss';
import View from '../../classes/View';
import FieldView from './field/FieldView';
import LeftListView from './leftBar/LeftBarView';
import UpperListView from './upperBar/UpperBarView';

export default class PuzzleView extends View {
  constructor() {
    const params = {
      tag: 'div',
      css: ['puzzle'],
    };
    super(params);
    this.viewNode.setCallback((e) => e.preventDefault(), 'contextmenu');

    this.field = new FieldView();
    this.leftList = new LeftListView();
    this.upperList = new UpperListView();
    this.addViewInside(this.field, this.leftList, this.upperList);
  }

  generateGame(scheme) {
    this.field.generateField(scheme);
    this.leftList.generateGame(scheme);
    this.upperList.generateGame(scheme);
  }
}
