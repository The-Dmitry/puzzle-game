import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';

const warningText =
  'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';

export default class ModalCardView extends View {
  addCost = 0;

  additives = new Map();

  totalNode = null;

  constructor(cardParams) {
    const params = {
      tag: 'article',
      css: ['modal-card'],
      callback: (e) => e.stopPropagation(),
    };
    super(params);
    this.defaulPrice = +cardParams.price;
    this.configureView(cardParams);
  }

  configureView(cardParams) {
    const image = new NodeCreator({
      tag: 'div',
      css: ['modal-card__image'],
    });
    const imageContainer = new NodeCreator({
      tag: 'div',
      css: ['modal-card__container'],
    });
    imageContainer.addInnerNode(image);
    image.getNode().style.backgroundImage = `url('${cardParams.image}')`;
    const details = this.createDetails(cardParams);
    this.viewNode.addInnerNode(imageContainer, details);
    this.showModal();
  }

  createDetails(cardParams) {
    const details = new NodeCreator({
      tag: 'div',
      css: ['modal-card__details'],
    });
    const title = new NodeCreator({
      tag: 'h4',
      css: ['modal-card__title'],
      text: cardParams.name,
    });
    const description = new NodeCreator({
      tag: 'h4',
      css: ['modal-card__description'],
      text: cardParams.description,
    });
    const sizeSelector = this.createSizeSelector(cardParams);
    const additivesSelector = this.createAdditivesSelector(cardParams);
    const totalPrice = new NodeCreator({
      tag: 'p',
      css: ['modal-card__price'],
    });
    this.totalNode = totalPrice;
    const warning = new NodeCreator({
      tag: 'p',
      css: ['modal-card__warning'],
      text: warningText,
    });
    const close = new NodeCreator({
      tag: 'button',
      css: ['modal-card__close'],
      text: 'Close',
      callback: () => this.closeModal(),
    });
    details.addInnerNode(
      title,
      description,
      sizeSelector,
      additivesSelector,
      totalPrice,
      warning,
      close
    );
    this.calculateTotal();
    return details;
  }

  createSizeSelector(cardParams) {
    const sizeContainer = new NodeCreator({
      tag: 'div',
      css: ['modal-card__size-selector'],
    });
    const sizeSubtitle = new NodeCreator({
      tag: 'p',
      css: ['modal-card__subtitle'],
      text: 'Size',
    });
    const btnContainer = new NodeCreator({
      tag: 'div',
      css: ['modal-card__button-container', 'size__button-container'],
    });
    const btns = Object.values(cardParams.sizes).map((info) => {
      const button = new NodeCreator({
        tag: 'button',
        css: ['modal-card__button'],
        text: info.size,
        callback: () => {
          this.addCost = +info['add-price'];
          this.calculateTotal();
          btns.forEach((btn) => btn.setClassNames(['modal-card__button']));
          button.setClassNames(['modal-card__button', 'modal-card__button_selected']);
        },
      });
      return button;
    });
    btns[0].setClassNames(['modal-card__button', 'modal-card__button_selected']);
    btnContainer.addInnerNode(...btns);
    sizeContainer.addInnerNode(sizeSubtitle, btnContainer);
    return sizeContainer;
  }

  createAdditivesSelector(cardParams) {
    const additivesContainer = new NodeCreator({
      tag: 'div',
      css: ['modal-card__additives-selector'],
    });
    const sizeSubtitle = new NodeCreator({
      tag: 'p',
      css: ['modal-card__subtitle'],
      text: 'Additives',
    });
    const btnContainer = new NodeCreator({
      tag: 'div',
      css: ['modal-card__button-container', 'additive__button-container'],
    });
    const btns = [...cardParams.additives].map((info, index) => {
      const button = new NodeCreator({
        tag: 'button',
        css: ['modal-card__button'],
        text: info.name,
        callback: () => {
          if (this.additives.has(index)) {
            this.additives.delete(index);
            button.setClassNames(['modal-card__button']);
          } else {
            this.additives.set(index, +info['add-price']);
            button.setClassNames(['modal-card__button', 'modal-card__button_selected']);
          }
          this.calculateTotal();
        },
      });
      return button;
    });
    btnContainer.addInnerNode(...btns);
    additivesContainer.addInnerNode(sizeSubtitle, btnContainer);
    return additivesContainer;
  }

  calculateTotal() {
    const finalCost =
      this.defaulPrice + this.addCost + [...this.additives.values()].reduce((a, b) => a + b, 0);
    this.totalNode.setTextContent(
      `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(finalCost)}`
    );
  }
}
