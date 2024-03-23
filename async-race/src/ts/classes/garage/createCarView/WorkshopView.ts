import './workshopView.scss';
import InputNodeCreator from '../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../common/nodeCreator/NodeCreator';
import View from '../../common/view/View';
import CarInfo from '../../../interfaces/CarInfo';

export default class WorkshopView extends View {
  constructor(private data?: CarInfo) {
    super({ tag: 'div', css: ['workshop'], callback: () => this.remove() });
    this.render();
  }

  private render() {
    const container = new NodeCreator({
      tag: 'div',
      css: ['workshop__container'],
      callback: (e) => e.stopImmediatePropagation(),
    });
    const title = new NodeCreator({ tag: 'h3', text: this.data ? 'Tuning' : 'New Car' });
    const sample = new NodeCreator({ tag: 'div', css: ['workshop__image'] });
    const carColor = new InputNodeCreator({ tag: 'input', type: 'color' });
    carColor.setCallback(() => {
      sample.node.style.backgroundColor = `${carColor.node.value}`;
    }, 'input');
    const carName = new InputNodeCreator({ tag: 'input', type: 'text', placeholder: 'Enter car name..' });
    if (this.data) {
      carColor.node.value = this.data.color;
      carName.node.value = this.data.name;
      sample.node.style.backgroundColor = `${carColor.node.value}`;
    }
    const submit = new NodeCreator({
      tag: 'button',
      text: this.data ? 'update' : 'add',
      callback: async () => {
        const name = carName.node.value;
        const color = carColor.node.value;
        if (!carName) return;
        if (this.data) {
          await this.httpClient.updateCar({
            ...this.data,
            color,
            name,
          });
        } else {
          await this.httpClient.createCar(name, color);
        }
        this.state.next('updateTrack', (v) => v);
        this.remove();
      },
    });
    const close = new NodeCreator({ tag: 'button', css: ['workshop-close'], callback: () => this.remove() });
    container.addInnerNode(title, sample, carColor, carName, submit, close);
    this.addNodeInside(container);
  }
}
