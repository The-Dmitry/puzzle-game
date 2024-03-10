import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/VIew';

const ANIMATION_DURATION = 0.3;

const ACTIVE_PUZZLE = 'puzzle-item_active';

const URL_TO_IMG = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/';

export default class PuzzleItemView extends View {
  private isAllowedToMove: boolean = true;

  private placeholder: NodeCreator;

  private shiftX: number = 0;

  private shiftY: number = 0;

  private nodeWidth = 0;

  private nodeHeight = 0;

  private coordsForReturn = {
    x: 0,
    y: 0,
  };

  private clickTime: number = 0;

  private onClick: (node: Element) => void;

  private onTouchStart: (e: Event) => void = this.onMouseDown.bind(this);

  private onDownFunc: (e: Event) => void = this.onMouseDown.bind(this);

  private onMoveFunc: (e: Event) => void = this.moveItem.bind(this);

  private mouseUpFunc: (e: Event) => void = this.resetItem.bind(this);

  constructor(
    text: string,
    itemWidth: number,
    bgShift: number,
    order: number,
    bgSrc: string,
    onClick: (node: Element) => void,
    placeholder: NodeCreator
  ) {
    super({
      tag: 'div',
      css: ['puzzle-item', 'puzzle-item_active'],
      text,
    });
    this.onClick = onClick;
    this.placeholder = placeholder;
    this.viewCreator.node.style.setProperty('--width', `${itemWidth.toFixed(2)}`);
    this.viewCreator.node.style.setProperty('--bgShift', `${bgShift.toFixed(2)}`);
    this.viewCreator.node.addEventListener('mousedown', this.onDownFunc);
    this.viewCreator.node.addEventListener('touchstart', this.onTouchStart);
    this.state.subscribe(
      this.viewCreator,
      'isAllowedToMovePuzzle',
      (v) => {
        this.isAllowedToMove = v ?? false;
      },
      false
    );
    this.addBackground(bgSrc, order);
  }

  private onMouseDown(event: Event | TouchEvent) {
    if (!this.isAllowedToMove) return;
    this.state.next('isAllowedToMovePuzzle', () => undefined);
    this.setCoordsForReturn();
    this.clickTime = new Date().getTime();
    if (event instanceof MouseEvent) {
      this.prepareToDrag(event);
      window.addEventListener('mousemove', this.onMoveFunc);
      window.addEventListener('mouseup', this.mouseUpFunc);
    } else {
      this.insteadOfClick(event);
      window.addEventListener('touchmove', this.onMoveFunc);
      window.addEventListener('touchend', this.mouseUpFunc);
    }
  }

  private prepareToDrag(event: MouseEvent | Touch) {
    const { left, top, width, height } = this.viewCreator.node.getBoundingClientRect();
    [this.shiftX, this.shiftY] = [event.clientX - left, event.clientY - top];
    [this.nodeWidth, this.nodeHeight] = [width, height];
    Object.assign(this.viewCreator.node.style, {
      position: 'absolute',
      left: `${event.pageX - this.shiftX}px`,
      top: `${event.pageY - this.shiftY}px`,
      pointerEvents: 'none',
    });
    this.viewCreator.node.parentNode?.insertBefore(this.placeholder.node, this.viewCreator.node);
    this.setPlaceholderWidth(width);
  }

  private moveItem(e: Event | TouchEvent) {
    let event;
    if (e instanceof MouseEvent) {
      event = e;
    }
    if (e instanceof TouchEvent) {
      [event] = [e.touches[0]];
    }
    if (event && event.target instanceof HTMLElement) {
      Object.assign(this.viewCreator.node.style, {
        left: `${Math.min(event.pageX - this.shiftX, window.innerWidth - this.nodeWidth)}px`,
        top: `${Math.min(event.pageY - this.shiftY, window.innerHeight - this.nodeHeight)}px`,
      });
      const leftSide = document.elementFromPoint(this.viewCreator.node.offsetLeft, event.clientY);
      // shift determines whether we're looking node by left or right side.
      let shift = 0;
      let elementBelow: Element | null = null;
      if (leftSide && leftSide.classList.contains(ACTIVE_PUZZLE)) {
        elementBelow = document.elementFromPoint(this.viewCreator.node.offsetLeft, event.clientY);
      } else {
        shift = this.nodeWidth;
        elementBelow = document.elementFromPoint(this.viewCreator.node.offsetLeft + this.nodeWidth, event.clientY);
      }
      if (elementBelow && elementBelow.classList.contains(ACTIVE_PUZZLE)) {
        if (this.isInsertBefore(elementBelow, shift)) {
          elementBelow.parentNode?.insertBefore(this.placeholder.node, elementBelow);
        } else {
          elementBelow.parentNode?.insertBefore(this.placeholder.node, elementBelow.nextSibling);
        }
      }
    }
  }

  private onMouseup(e: Event | TouchEvent) {
    if (new Date().getTime() - this.clickTime < 100) {
      this.onClick(this.viewCreator.node);
      this.smoothMovement();
      this.smoothlyHidePlaceholder();
      return;
    }
    let { target } = e;
    if (e instanceof TouchEvent) {
      this.viewCreator.node.style.display = 'none';
      target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      this.viewCreator.node.style.display = 'flex';
    }

    if (target instanceof HTMLElement && target.classList.contains('placeholder')) {
      target.parentNode?.insertBefore(this.viewCreator.node, this.placeholder.node);
      this.smoothOnReplace();
      return;
    }
    if (target instanceof HTMLElement && target.classList.contains('puzzle-row_active')) {
      target.append(this.viewCreator.node);
      this.smoothlyHidePlaceholder();
    }
    this.smoothMovement();
  }

  private insteadOfClick(event: Event | TouchEvent) {
    if (event instanceof TouchEvent) {
      this.prepareToDrag(event.touches[0]);
    }
  }

  private smoothMovement() {
    this.viewCreator.node.style.position = 'static';
    const { offsetLeft, offsetTop } = this.viewCreator.node;
    Object.assign(this.viewCreator.node.style, {
      position: 'absolute',
      left: `${this.coordsForReturn.x}px`,
      top: `${this.coordsForReturn.y}px`,
    });
    this.coordsForReturn = { x: offsetLeft, y: offsetTop };
  }

  private smoothOnReplace() {
    const { offsetLeft, offsetTop } = this.placeholder.node;
    this.coordsForReturn = { x: offsetLeft, y: offsetTop };
  }

  private smoothlyHidePlaceholder() {
    Object.assign(this.placeholder.node.style, {
      transition: `all linear ${ANIMATION_DURATION}s`,
      width: '0px',
    });
  }

  private resetItem(e: Event) {
    this.onMouseup(e);
    Object.assign(this.viewCreator.node.style, {
      position: 'absolute',
      transition: `all linear ${ANIMATION_DURATION}s`,
      left: `${this.coordsForReturn.x}px`,
      top: `${this.coordsForReturn.y}px`,
    });
    setTimeout(() => {
      this.placeholder.remove();
      this.viewCreator.node.style.removeProperty('position');
      this.viewCreator.node.style.removeProperty('pointer-events');
      this.viewCreator.node.style.removeProperty('transition');
      this.state.next('afterItemMoving', (v) => v);
      this.state.next('isAllowedToMovePuzzle', () => true);
    }, ANIMATION_DURATION * 1000);
    if (e instanceof MouseEvent) {
      window.removeEventListener('mouseup', this.mouseUpFunc);
      window.removeEventListener('mousemove', this.onMoveFunc);
    } else {
      window.removeEventListener('touchend', this.mouseUpFunc);
      window.removeEventListener('touchmove', this.onMoveFunc);
    }
  }

  private setPlaceholderWidth(width: number) {
    this.placeholder.node.style.width = `${width}px`;
  }

  private isInsertBefore(item: Element, shift: number) {
    const { width, left } = item.getBoundingClientRect();
    const itemCenter = width / 2 + left;
    return this.viewCreator.node.offsetLeft + shift < itemCenter;
  }

  public makeItemInactive() {
    this.viewCreator.removeCLassName('puzzle-item_active');
    this.viewCreator.node.removeEventListener('mousedown', this.onDownFunc);
    this.viewCreator.node.removeEventListener('touchstart', this.onTouchStart);
  }

  private setCoordsForReturn() {
    const { offsetLeft, offsetTop } = this.viewCreator.node;
    this.coordsForReturn = { x: offsetLeft, y: offsetTop };
  }

  private addBackground(src: string, order: number) {
    const url = `url(${URL_TO_IMG}${src})`;
    this.viewCreator.node.style.backgroundImage = url;
    this.viewCreator.node.style.backgroundPositionY = `${11.11 * order}%`;
  }

  public autocomplete(resultBlock: Element | undefined) {
    if (resultBlock) {
      resultBlock.append(this.viewCreator.node);
      this.makeItemInactive();
    }
  }
}
