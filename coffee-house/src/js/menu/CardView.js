import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';

export default class CardView extends View {
  constructor(cardParams) {
    const params = {
      tag: 'article',
      cssClasses: ['menu-content__card', 'card'],
    };
    super(params);
    this.configureView(cardParams);
  }

  configureView(cardParams) {
    const image = new NodeCreator({
      tag: 'div',
      cssClasses: ['card-image'],
    });
    image.getNode().style.backgroundImage = `url('${cardParams.image}')`;
    const content = new NodeCreator({
      tag: 'div',
      cssClasses: ['card-text'],
    });
    const title = new NodeCreator({
      tag: 'h4',
      cssClasses: ['card-title'],
      textContent: cardParams.name,
    });
    const description = new NodeCreator({
      tag: 'p',
      cssClasses: ['card-description'],
      textContent: cardParams.description,
    });
    const price = new NodeCreator({
      tag: 'p',
      cssClasses: ['card-price'],
      textContent: `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(cardParams.price)}`,
    });
    content.addInnerNode(title, description, price);
    this.viewNode.addInnerNode(image, content);
  }
}
