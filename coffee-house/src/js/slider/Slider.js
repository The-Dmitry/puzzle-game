import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';
import sliderData from './slider-data';

const parent = document.querySelector('.favourite-coffee');

export default class SliderView extends View {
  sliderFrame;

  currentSlideId = 0;

  isAllowedToMove = true;

  progressBarButtons = [];

  timer;

  constructor() {
    const params = {
      tag: 'div',
      css: ['slider'],
    };
    super(params);
    parent.append(this.viewNode.getNode());
    this.configureView();
    this.generateSlide();
    this.automaticScroll();
  }

  configureView() {
    const prev = new NodeCreator({
      tag: 'button',
      css: ['slider-button__prev', 'slider-button'],
      callback: this.moveSlideToLeft.bind(this),
    });
    const sliderFrame = new NodeCreator({
      tag: 'div',
      css: ['slider-frame'],
    });
    this.sliderFrame = sliderFrame;
    const next = new NodeCreator({
      tag: 'button',
      css: ['slider-button__next', 'slider-button'],
      callback: this.moveSlideToRight.bind(this),
    });
    prev.getNode().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    next.getNode().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    const bar = this.generateProgressBar();
    this.viewNode.addInnerNode(prev, sliderFrame, bar, next);
    this.sliderFrame.setCallback(this.makeSwipe.bind(this), 'touchstart');
    this.sliderFrame.setCallback(this.stopAutomaticScroll.bind(this), 'mouseenter');
    this.sliderFrame.setCallback(this.automaticScroll.bind(this), 'mouseleave');
  }

  generateSlide() {
    this.validateId();
    const id = this.currentSlideId;
    this.manageProgressButtons();
    const slide = new NodeCreator({
      tag: 'article',
      css: ['slider__slide', 'slide'],
    });
    const image = new NodeCreator({
      tag: 'div',
      css: ['slide__image'],
    });
    image.getNode().style.backgroundImage = `url('${sliderData[id].image}')`;
    const title = new NodeCreator({
      tag: 'h3',
      css: ['slide__title'],
      text: sliderData[id].title,
    });
    const description = new NodeCreator({
      tag: 'p',
      css: ['slide__description'],
      text: sliderData[id].description,
    });
    const price = new NodeCreator({
      tag: 'p',
      css: ['slide__price'],
      text: `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(sliderData[id].price)}`,
    });
    slide.addInnerNode(image, title, description, price);
    this.sliderFrame.addInnerNode(slide);
  }

  moveSlide(newSlideClass, currentSlideClass) {
    if (this.isAllowedToMove) {
      this.isAllowedToMove = false;
      this.generateSlide();
      const [currentSlide, newSlide] = this.sliderFrame.getNode().children;
      currentSlide.classList.add(currentSlideClass);
      newSlide.classList.add(newSlideClass);
      currentSlide.addEventListener('animationend', () => {
        currentSlide.remove();
      });
      newSlide.addEventListener('animationend', () => {
        newSlide.classList.remove('slide_from-right', 'slide_from-left');
        this.isAllowedToMove = true;
      });
    }
  }

  validateId() {
    if (this.currentSlideId < 0) {
      this.currentSlideId = sliderData.length - 1;
    }
    if (this.currentSlideId > sliderData.length - 1) {
      this.currentSlideId = 0;
    }
  }

  generateProgressBar() {
    const bar = new NodeCreator({
      tag: 'div',
      css: ['slider__progress-bar', 'progress-bar'],
    });
    this.progressBarButtons = new Array(sliderData.length).fill(0).map(
      () =>
        new NodeCreator({
          tag: 'button',
          css: ['progress-bar__button'],
        })
    );
    bar.addInnerNode(...this.progressBarButtons);
    return bar;
  }

  manageProgressButtons() {
    this.progressBarButtons.forEach((btn, index) => {
      // eslint-disable-next-line no-param-reassign
      btn.getNode().disabled = this.currentSlideId === index;
    });
  }

  makeSwipe(startEvent) {
    if (!this.isAllowedToMove) {
      return;
    }
    this.stopAutomaticScroll();
    const start = startEvent.changedTouches[0];

    const startX = start.clientX;
    const startY = start.clientY;
    const startTime = new Date().getTime();

    this.sliderFrame.getNode().addEventListener('touchend', (endEvent) => {
      const end = endEvent.changedTouches[0];
      const distanceX = end.clientX - startX;
      const distanceY = end.clientY - startY;
      const endTime = new Date().getTime() - startTime;
      if (endTime > 500) {
        this.automaticScroll();
        return;
      }
      if (Math.abs(distanceX) >= 100 && Math.abs(distanceY <= 100)) {
        if (distanceX > 0) {
          this.moveSlideToLeft();
        } else {
          this.moveSlideToRight();
        }
      }
    });
  }

  moveSlideToLeft() {
    this.stopAutomaticScroll();
    this.automaticScroll();
    this.currentSlideId -= 1;
    this.moveSlide('slide_from-left', 'slide_to-right');
  }

  moveSlideToRight() {
    this.stopAutomaticScroll();
    this.automaticScroll();
    this.currentSlideId += 1;
    this.moveSlide('slide_from-right', 'slide_to-left');
  }

  automaticScroll() {
    this.timer = setTimeout(() => {
      this.moveSlideToRight();
    }, 7000);
  }

  stopAutomaticScroll() {
    clearTimeout(this.timer);
  }
}
