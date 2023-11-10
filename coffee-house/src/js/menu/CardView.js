import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';
import ModalCardView from './ModalCardView';

export default class CardView extends View {
  constructor(cardParams) {
    const params = {
      tag: 'article',
      css: ['menu-content__card', 'card'],
      callback: () => new ModalCardView(cardParams),
    };
    super(params);
    this.configureView(cardParams);
  }

  configureView(cardParams) {
    const image = new NodeCreator({
      tag: 'div',
      css: ['card-image'],
    });
    image.getNode().style.backgroundImage = `url('${cardParams.image}')`;
    const content = new NodeCreator({
      tag: 'div',
      css: ['card-text'],
    });
    const title = new NodeCreator({
      tag: 'h4',
      css: ['card-title'],
      text: cardParams.name,
    });
    const description = new NodeCreator({
      tag: 'p',
      css: ['card-description'],
      text: cardParams.description,
    });
    const price = new NodeCreator({
      tag: 'p',
      css: ['card-price'],
      text: `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(cardParams.price)}`,
    });
    content.addInnerNode(title, description, price);
    this.viewNode.addInnerNode(image, content);
  }
}
