import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';
import ProgressBarView from './ProgressBarView';
import sliderData from './slider-data';

const parent = document.querySelector('.favourite-coffee');

export default class SliderView extends View {
  sliderFrame;

  currentSlideId = 0;

  isAllowedToMove = true;

  progressBar;

  constructor() {
    const params = {
      tag: 'div',
      css: ['slider'],
    };
    super(params);
    parent.append(this.viewNode.getNode());
    this.configureView();
    this.generateSlide();
  }

  configureView() {
    const prev = new NodeCreator({
      tag: 'button',
      css: ['slider-button__prev', 'slider-button'],
      callback: this.moveSlideToRight.bind(this),
    });
    const sliderFrame = new NodeCreator({
      tag: 'div',
      css: ['slider-frame'],
    });
    this.sliderFrame = sliderFrame;
    const next = new NodeCreator({
      tag: 'button',
      css: ['slider-button__next', 'slider-button'],
      callback: this.moveSlideToLeft.bind(this),
    });
    prev.getNode().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    next.getNode().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    this.progressBar = new ProgressBarView(sliderData.length, this.moveSlideToLeft.bind(this));
    this.viewNode.addInnerNode(prev, sliderFrame, this.progressBar.getElement(), next);
  }

  generateSlide() {
    this.validateId();
    const id = this.currentSlideId;
    const slide = new NodeCreator({
      tag: 'article',
      css: ['slider__slide', 'slide'],
    });
    slide.setCallback(this.makeSwipe.bind(this), 'touchstart');
    slide.setCallback(() => this.progressBar.pauseAutomaticScroll(), 'mouseenter');
    slide.setCallback(() => this.progressBar.continueAutomaticScroll(), 'mouseleave');
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
    this.progressBar.switchSlide(this.currentSlideId);
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

  makeSwipe(startEvent) {
    if (!this.isAllowedToMove) {
      return;
    }
    this.progressBar.pauseAutomaticScroll();
    const start = startEvent.changedTouches[0];
    const startX = start.clientX;
    const startY = start.clientY;
    const startTime = new Date().getTime();

    const endSwipe = (endEvent) => {
      const end = endEvent.changedTouches[0];
      const distanceX = end.clientX - startX;
      const distanceY = end.clientY - startY;
      const endTime = new Date().getTime() - startTime;
      this.progressBar.continueAutomaticScroll();
      start.target.removeEventListener('touchend', endSwipe);
      if (endTime > 500) {
        return;
      }
      if (Math.abs(distanceX) >= 100 && Math.abs(distanceY <= 100)) {
        if (distanceX > 0) {
          this.moveSlideToRight();
        } else {
          this.moveSlideToLeft();
        }
      }
    };
    start.target.addEventListener('touchend', endSwipe);
  }

  moveSlideToRight() {
    if (this.isAllowedToMove) {
      this.currentSlideId -= 1;
      this.moveSlide('slide_from-left', 'slide_to-right');
    }
  }

  moveSlideToLeft() {
    if (this.isAllowedToMove) {
      this.currentSlideId += 1;
      this.moveSlide('slide_from-right', 'slide_to-left');
    }
  }
}
