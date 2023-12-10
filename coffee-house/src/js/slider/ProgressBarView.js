import NodeCreator from '../classes/NodeCreate';
import View from '../classes/View';

export default class ProgressBarView extends View {
  currentTime = 0;

  defaultTime = 7;

  indicatorNodes;

  currentSlide = 0;

  timer;

  constructor(sliderCount, moveSlide) {
    const params = {
      tag: 'ul',
      css: ['slider__progress-bar', 'progress-bar'],
    };
    super(params);
    this.moveSlide = moveSlide;
    this.configureView(sliderCount);
    this.automaticScroll();
  }

  configureView(sliderCount) {
    const bar = new NodeCreator({
      tag: 'ul',
      css: ['slider__progress-bar', 'progress-bar'],
    });
    this.indicatorNodes = new Array(sliderCount).fill(0).map(
      () =>
        new NodeCreator({
          tag: 'li',
          css: ['progress-bar__indicator'],
        })
    );
    bar.addInnerNode(...this.indicatorNodes);
    this.viewNode.addInnerNode(bar);
  }

  automaticScroll() {
    this.timer = setTimeout(() => {
      this.currentTime += 0.1;
      if (this.currentTime <= this.defaultTime) {
        this.manageProgressIndicators();
      } else {
        this.moveSlide();
      }
      this.automaticScroll();
    }, 100);
  }

  pauseAutomaticScroll() {
    clearInterval(this.timer);
  }

  continueAutomaticScroll() {
    this.automaticScroll();
  }

  switchSlide(id) {
    this.currentSlide = id;
    this.currentTime = 0;
  }

  manageProgressIndicators() {
    const width = (100 / this.defaultTime) * this.currentTime;
    this.indicatorNodes.forEach((indicator, index) => {
      indicator
        .getNode()
        .style.setProperty('--progress-width', `${index === this.currentSlide ? width : 0}%`);
    });
  }
}
