/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/home/home.scss":
/*!****************************!*\
  !*** ./src/home/home.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/burger/Burger.js":
/*!*********************************!*\
  !*** ./src/js/burger/Burger.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BurgerView)
/* harmony export */ });
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");
/* harmony import */ var _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/NodeCreate */ "./src/js/classes/NodeCreate.js");



class BurgerView extends _classes_View__WEBPACK_IMPORTED_MODULE_0__["default"] {
  burgerButton = document.querySelector('.burger');

  isOpened = false;

  constructor(isHome) {
    const params = {
      tag: 'div',
      css: ['burger-menu'],
      callback: () => this.manageMenu(),
    };
    super(params);
    this.generateMenu(isHome);
    this.burgerButton.addEventListener('click', this.manageMenu.bind(this));
    window.addEventListener('resize', (e) => {
      if (e.currentTarget.innerWidth > 768 && this.isOpened) {
        this.manageMenu();
      }
    });
  }

  generateMenu(isHome) {
    const startId = isHome ? '' : './home.html';
    const links = [
      new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_1__["default"]({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'Favorite coffee',
        href: `${startId}#favourite-coffee`,
      }),
      new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_1__["default"]({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'About',
        href: `${startId}#about`,
      }),
      new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_1__["default"]({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'Mobile app',
        href: `${startId}#mobile-app`,
      }),
      new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_1__["default"]({
        tag: 'a',
        css: ['burger-menu__link'],
        text: 'Contact us',
        href: `#footer`,
      }),
      new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_1__["default"]({
        tag: 'a',
        css: ['burger-menu__link', `${isHome ? '1' : 'none-events'}`],
        text: 'Menu',
        href: './menu.html',
      }),
    ];
    this.viewNode.addInnerNode(...links);
  }

  manageMenu() {
    if (!this.isOpened) {
      document.body.append(this.viewNode.getNode());

      setTimeout(() => {
        this.viewNode.getNode().classList.add('burger-menu_open');
      }, 0);
    } else {
      this.viewNode.setClassNames(['burger-menu']);
      setTimeout(() => {
        this.viewNode.getNode().remove();
      }, 300);
    }
    this.isOpened = !this.isOpened;
    document.body.classList.toggle('blocked');
    this.burgerButton.classList.toggle('burger_active');
  }
}


/***/ }),

/***/ "./src/js/classes/NodeCreate.js":
/*!**************************************!*\
  !*** ./src/js/classes/NodeCreate.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NodeCreator)
/* harmony export */ });
class NodeCreator {
  constructor(params) {
    this.node = this.createNode(params);
  }

  getNode() {
    return this.node;
  }

  createNode(params) {
    this.node = document.createElement(params.tag);
    this.setClassNames(params.css);
    this.setTextContent(params.text);
    this.setId(params.id);
    if (params.callback) this.setCallback(params.callback);
    if (params.href) this.setHref(params.href);
    return this.node;
  }

  setHref(string) {
    this.node.href = string;
  }

  setClassNames(cssList) {
    if (cssList) {
      this.node.className = '';
      this.node.classList.add(...cssList);
    }
  }

  setTextContent(text) {
    if (text) this.node.textContent = text;
  }

  setCallback(callback, handler = 'click') {
    this.node.addEventListener(handler, callback);
  }

  setId(id) {
    if (id) this.node.id = id;
  }

  setAttribute(name, value) {
    this.node.setAttribute(name, value);
  }

  addInnerNode(...list) {
    list.forEach((node) => {
      if (node instanceof NodeCreator) {
        this.node.append(node.getNode());
      } else {
        this.node.append(node);
      }
    });
  }

  prependInnerNode(...list) {
    list.forEach((node) => {
      if (node instanceof NodeCreator) {
        this.node.prepend(node.getNode());
      } else {
        this.node.prepend(node);
      }
    });
  }

  removeAllChildren() {
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
  }

  removeNode() {
    this.node.remove();
  }
}


/***/ }),

/***/ "./src/js/classes/View.js":
/*!********************************!*\
  !*** ./src/js/classes/View.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _NodeCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeCreate */ "./src/js/classes/NodeCreate.js");


class View {
  modal = null;

  constructor(params) {
    this.viewNode = new _NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"](params);
  }

  getElement() {
    return this.viewNode.getNode();
  }

  addViewInside(...view) {
    view.forEach((inst) => this.viewNode.addInnerNode(inst.getElement()));
  }

  showModal() {
    const modal = new _NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['modal'],
      callback: () => this.closeModal(),
    });
    modal.addInnerNode(this.viewNode);
    this.modal = modal;
    document.body.append(this.modal.getNode());
    document.body.classList.add('blocked');
  }

  closeModal() {
    if (this.modal) {
      this.modal.getNode().remove();
      document.body.classList.remove('blocked');
    }
  }
}


/***/ }),

/***/ "./src/js/slider/ProgressBarView.js":
/*!******************************************!*\
  !*** ./src/js/slider/ProgressBarView.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProgressBarView)
/* harmony export */ });
/* harmony import */ var _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/NodeCreate */ "./src/js/classes/NodeCreate.js");
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");



class ProgressBarView extends _classes_View__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
    const bar = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'ul',
      css: ['slider__progress-bar', 'progress-bar'],
    });
    this.indicatorNodes = new Array(sliderCount).fill(0).map(
      () =>
        new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
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


/***/ }),

/***/ "./src/js/slider/Slider.js":
/*!*********************************!*\
  !*** ./src/js/slider/Slider.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SliderView)
/* harmony export */ });
/* harmony import */ var _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/NodeCreate */ "./src/js/classes/NodeCreate.js");
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");
/* harmony import */ var _ProgressBarView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProgressBarView */ "./src/js/slider/ProgressBarView.js");
/* harmony import */ var _slider_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider-data */ "./src/js/slider/slider-data.js");





const parent = document.querySelector('.favourite-coffee');

class SliderView extends _classes_View__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
    const prev = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'button',
      css: ['slider-button__prev', 'slider-button'],
      callback: this.moveSlideToRight.bind(this),
    });
    const sliderFrame = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['slider-frame'],
    });
    this.sliderFrame = sliderFrame;
    const next = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
    this.progressBar = new _ProgressBarView__WEBPACK_IMPORTED_MODULE_2__["default"](_slider_data__WEBPACK_IMPORTED_MODULE_3__["default"].length, this.moveSlideToLeft.bind(this));
    this.viewNode.addInnerNode(prev, sliderFrame, this.progressBar.getElement(), next);
  }

  generateSlide() {
    this.validateId();
    const id = this.currentSlideId;
    const slide = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'article',
      css: ['slider__slide', 'slide'],
    });
    slide.setCallback(this.makeSwipe.bind(this), 'touchstart');
    slide.setCallback(() => this.progressBar.pauseAutomaticScroll(), 'mouseenter');
    slide.setCallback(() => this.progressBar.continueAutomaticScroll(), 'mouseleave');
    const image = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['slide__image'],
    });
    image.getNode().style.backgroundImage = `url('${_slider_data__WEBPACK_IMPORTED_MODULE_3__["default"][id].image}')`;
    const title = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'h3',
      css: ['slide__title'],
      text: _slider_data__WEBPACK_IMPORTED_MODULE_3__["default"][id].title,
    });
    const description = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['slide__description'],
      text: _slider_data__WEBPACK_IMPORTED_MODULE_3__["default"][id].description,
    });
    const price = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['slide__price'],
      text: `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(_slider_data__WEBPACK_IMPORTED_MODULE_3__["default"][id].price)}`,
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
      this.currentSlideId = _slider_data__WEBPACK_IMPORTED_MODULE_3__["default"].length - 1;
    }
    if (this.currentSlideId > _slider_data__WEBPACK_IMPORTED_MODULE_3__["default"].length - 1) {
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


/***/ }),

/***/ "./src/js/slider/slider-data.js":
/*!**************************************!*\
  !*** ./src/js/slider/slider-data.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_image_slider_coffee_slider_1_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/image/slider/coffee-slider-1.png */ "./src/assets/image/slider/coffee-slider-1.png");
/* harmony import */ var _assets_image_slider_coffee_slider_2_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/image/slider/coffee-slider-2.png */ "./src/assets/image/slider/coffee-slider-2.png");
/* harmony import */ var _assets_image_slider_coffee_slider_3_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/image/slider/coffee-slider-3.png */ "./src/assets/image/slider/coffee-slider-3.png");




const sliderData = [
  {
    title: 'S’mores Frappuccino',
    description:
      'This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.',
    price: 5.5,
    image: _assets_image_slider_coffee_slider_1_png__WEBPACK_IMPORTED_MODULE_0__,
  },
  {
    title: 'Caramel Macchiato',
    description:
      'Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.',
    price: 5,
    image: _assets_image_slider_coffee_slider_2_png__WEBPACK_IMPORTED_MODULE_1__,
  },
  {
    title: 'Ice coffee',
    description:
      'A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.',
    price: 4.5,
    image: _assets_image_slider_coffee_slider_3_png__WEBPACK_IMPORTED_MODULE_2__,
  },
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliderData);


/***/ }),

/***/ "./src/assets/image/slider/coffee-slider-1.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/slider/coffee-slider-1.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/35bfd364adf735bd9f03.png";

/***/ }),

/***/ "./src/assets/image/slider/coffee-slider-2.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/slider/coffee-slider-2.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/e4e3e165c367a9f609c3.png";

/***/ }),

/***/ "./src/assets/image/slider/coffee-slider-3.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/slider/coffee-slider-3.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/6654fe0841ef47c3a63b.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/home/home.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.scss */ "./src/home/home.scss");
/* harmony import */ var _js_slider_Slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/slider/Slider */ "./src/js/slider/Slider.js");
/* harmony import */ var _js_burger_Burger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/burger/Burger */ "./src/js/burger/Burger.js");




// eslint-disable-next-line no-unused-vars
const slider = new _js_slider_Slider__WEBPACK_IMPORTED_MODULE_1__["default"]();
const burger = new _js_burger_Burger__WEBPACK_IMPORTED_MODULE_2__["default"](true);

console.log('Все пункты ТЗ выполнены!!!');
console.log(
  'СВАЙПЫ РЕАЛИЗОВАНЫ ТОЛЬКО ДЛЯ МОБИЛЬНОЙ ВЕРСИИ - СОГЛАСНО ТЗ (АНИМАЦИЯ С ПРИМЕРОМ НЕ ЯВЛЯЕТСЯ КРИТЕРИЕМ ДЛЯ ПРОВЕРКИ, А ТАК ЖЕ, СВАЙПЫ НЕ ЯВЛЯЮТСЯ ОЖИДАЕМЫМ ПОВЕДЕНИЕМ ДЛЯ ДЕСКТОПА)!!! Для проверки открывайте devtools и переходите в мобильный режим. \nСпасибо и удачи!'
);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakt1RTtBQUNBO0FBQ0E7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUVBQVU7QUFDckIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFFQUFVO0FBQ3JCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxRUFBVTtBQUNyQixHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNUIxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7QUNmcUI7QUFDd0I7QUFDQTs7QUFFN0M7QUFDQSxtQkFBbUIseURBQVU7QUFDN0IsbUJBQW1CLHlEQUFVOztBQUU3QjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2hvbWUvaG9tZS5zY3NzPzZhNDYiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvYnVyZ2VyL0J1cmdlci5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9jbGFzc2VzL05vZGVDcmVhdGUuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvY2xhc3Nlcy9WaWV3LmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL3NsaWRlci9Qcm9ncmVzc0JhclZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvc2xpZGVyL1NsaWRlci5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9zbGlkZXIvc2xpZGVyLWRhdGEuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2hvbWUvaG9tZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1cmdlclZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgYnVyZ2VyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1cmdlcicpO1xuXG4gIGlzT3BlbmVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoaXNIb21lKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydidXJnZXItbWVudSddLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMubWFuYWdlTWVudSgpLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICB0aGlzLmdlbmVyYXRlTWVudShpc0hvbWUpO1xuICAgIHRoaXMuYnVyZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5tYW5hZ2VNZW51LmJpbmQodGhpcykpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5pbm5lcldpZHRoID4gNzY4ICYmIHRoaXMuaXNPcGVuZWQpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZU1lbnUoaXNIb21lKSB7XG4gICAgY29uc3Qgc3RhcnRJZCA9IGlzSG9tZSA/ICcnIDogJy4vaG9tZS5odG1sJztcbiAgICBjb25zdCBsaW5rcyA9IFtcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ0Zhdm9yaXRlIGNvZmZlZScsXG4gICAgICAgIGhyZWY6IGAke3N0YXJ0SWR9I2Zhdm91cml0ZS1jb2ZmZWVgLFxuICAgICAgfSksXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJ10sXG4gICAgICAgIHRleHQ6ICdBYm91dCcsXG4gICAgICAgIGhyZWY6IGAke3N0YXJ0SWR9I2Fib3V0YCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnTW9iaWxlIGFwcCcsXG4gICAgICAgIGhyZWY6IGAke3N0YXJ0SWR9I21vYmlsZS1hcHBgLFxuICAgICAgfSksXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJ10sXG4gICAgICAgIHRleHQ6ICdDb250YWN0IHVzJyxcbiAgICAgICAgaHJlZjogYCNmb290ZXJgLFxuICAgICAgfSksXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJywgYCR7aXNIb21lID8gJzEnIDogJ25vbmUtZXZlbnRzJ31gXSxcbiAgICAgICAgdGV4dDogJ01lbnUnLFxuICAgICAgICBocmVmOiAnLi9tZW51Lmh0bWwnLFxuICAgICAgfSksXG4gICAgXTtcbiAgICB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZSguLi5saW5rcyk7XG4gIH1cblxuICBtYW5hZ2VNZW51KCkge1xuICAgIGlmICghdGhpcy5pc09wZW5lZCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy52aWV3Tm9kZS5nZXROb2RlKCkpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3Tm9kZS5nZXROb2RlKCkuY2xhc3NMaXN0LmFkZCgnYnVyZ2VyLW1lbnVfb3BlbicpO1xuICAgICAgfSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld05vZGUuc2V0Q2xhc3NOYW1lcyhbJ2J1cmdlci1tZW51J10pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpLnJlbW92ZSgpO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gICAgdGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnYmxvY2tlZCcpO1xuICAgIHRoaXMuYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2J1cmdlcl9hY3RpdmUnKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZUNyZWF0b3Ige1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLm5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUocGFyYW1zKTtcbiAgfVxuXG4gIGdldE5vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgfVxuXG4gIGNyZWF0ZU5vZGUocGFyYW1zKSB7XG4gICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChwYXJhbXMudGFnKTtcbiAgICB0aGlzLnNldENsYXNzTmFtZXMocGFyYW1zLmNzcyk7XG4gICAgdGhpcy5zZXRUZXh0Q29udGVudChwYXJhbXMudGV4dCk7XG4gICAgdGhpcy5zZXRJZChwYXJhbXMuaWQpO1xuICAgIGlmIChwYXJhbXMuY2FsbGJhY2spIHRoaXMuc2V0Q2FsbGJhY2socGFyYW1zLmNhbGxiYWNrKTtcbiAgICBpZiAocGFyYW1zLmhyZWYpIHRoaXMuc2V0SHJlZihwYXJhbXMuaHJlZik7XG4gICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgfVxuXG4gIHNldEhyZWYoc3RyaW5nKSB7XG4gICAgdGhpcy5ub2RlLmhyZWYgPSBzdHJpbmc7XG4gIH1cblxuICBzZXRDbGFzc05hbWVzKGNzc0xpc3QpIHtcbiAgICBpZiAoY3NzTGlzdCkge1xuICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9ICcnO1xuICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoLi4uY3NzTGlzdCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VGV4dENvbnRlbnQodGV4dCkge1xuICAgIGlmICh0ZXh0KSB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9XG5cbiAgc2V0Q2FsbGJhY2soY2FsbGJhY2ssIGhhbmRsZXIgPSAnY2xpY2snKSB7XG4gICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoaGFuZGxlciwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0SWQoaWQpIHtcbiAgICBpZiAoaWQpIHRoaXMubm9kZS5pZCA9IGlkO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBhZGRJbm5lck5vZGUoLi4ubGlzdCkge1xuICAgIGxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBOb2RlQ3JlYXRvcikge1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kKG5vZGUuZ2V0Tm9kZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmQobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcmVwZW5kSW5uZXJOb2RlKC4uLmxpc3QpIHtcbiAgICBsaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZUNyZWF0b3IpIHtcbiAgICAgICAgdGhpcy5ub2RlLnByZXBlbmQobm9kZS5nZXROb2RlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub2RlLnByZXBlbmQobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVBbGxDaGlsZHJlbigpIHtcbiAgICB3aGlsZSAodGhpcy5ub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTm9kZSgpIHtcbiAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuL05vZGVDcmVhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgbW9kYWwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMudmlld05vZGUgPSBuZXcgTm9kZUNyZWF0b3IocGFyYW1zKTtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpO1xuICB9XG5cbiAgYWRkVmlld0luc2lkZSguLi52aWV3KSB7XG4gICAgdmlldy5mb3JFYWNoKChpbnN0KSA9PiB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZShpbnN0LmdldEVsZW1lbnQoKSkpO1xuICB9XG5cbiAgc2hvd01vZGFsKCkge1xuICAgIGNvbnN0IG1vZGFsID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnbW9kYWwnXSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmNsb3NlTW9kYWwoKSxcbiAgICB9KTtcbiAgICBtb2RhbC5hZGRJbm5lck5vZGUodGhpcy52aWV3Tm9kZSk7XG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMubW9kYWwuZ2V0Tm9kZSgpKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2Jsb2NrZWQnKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgIHRoaXMubW9kYWwuZ2V0Tm9kZSgpLnJlbW92ZSgpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdibG9ja2VkJyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi4vY2xhc3Nlcy9Ob2RlQ3JlYXRlJztcbmltcG9ydCBWaWV3IGZyb20gJy4uL2NsYXNzZXMvVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2dyZXNzQmFyVmlldyBleHRlbmRzIFZpZXcge1xuICBjdXJyZW50VGltZSA9IDA7XG5cbiAgZGVmYXVsdFRpbWUgPSA3O1xuXG4gIGluZGljYXRvck5vZGVzO1xuXG4gIGN1cnJlbnRTbGlkZSA9IDA7XG5cbiAgdGltZXI7XG5cbiAgY29uc3RydWN0b3Ioc2xpZGVyQ291bnQsIG1vdmVTbGlkZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ3VsJyxcbiAgICAgIGNzczogWydzbGlkZXJfX3Byb2dyZXNzLWJhcicsICdwcm9ncmVzcy1iYXInXSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgdGhpcy5tb3ZlU2xpZGUgPSBtb3ZlU2xpZGU7XG4gICAgdGhpcy5jb25maWd1cmVWaWV3KHNsaWRlckNvdW50KTtcbiAgICB0aGlzLmF1dG9tYXRpY1Njcm9sbCgpO1xuICB9XG5cbiAgY29uZmlndXJlVmlldyhzbGlkZXJDb3VudCkge1xuICAgIGNvbnN0IGJhciA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICd1bCcsXG4gICAgICBjc3M6IFsnc2xpZGVyX19wcm9ncmVzcy1iYXInLCAncHJvZ3Jlc3MtYmFyJ10sXG4gICAgfSk7XG4gICAgdGhpcy5pbmRpY2F0b3JOb2RlcyA9IG5ldyBBcnJheShzbGlkZXJDb3VudCkuZmlsbCgwKS5tYXAoXG4gICAgICAoKSA9PlxuICAgICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICAgIHRhZzogJ2xpJyxcbiAgICAgICAgICBjc3M6IFsncHJvZ3Jlc3MtYmFyX19pbmRpY2F0b3InXSxcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGJhci5hZGRJbm5lck5vZGUoLi4udGhpcy5pbmRpY2F0b3JOb2Rlcyk7XG4gICAgdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoYmFyKTtcbiAgfVxuXG4gIGF1dG9tYXRpY1Njcm9sbCgpIHtcbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lICs9IDAuMTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUaW1lIDw9IHRoaXMuZGVmYXVsdFRpbWUpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VQcm9ncmVzc0luZGljYXRvcnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW92ZVNsaWRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmF1dG9tYXRpY1Njcm9sbCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwYXVzZUF1dG9tYXRpY1Njcm9sbCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICB9XG5cbiAgY29udGludWVBdXRvbWF0aWNTY3JvbGwoKSB7XG4gICAgdGhpcy5hdXRvbWF0aWNTY3JvbGwoKTtcbiAgfVxuXG4gIHN3aXRjaFNsaWRlKGlkKSB7XG4gICAgdGhpcy5jdXJyZW50U2xpZGUgPSBpZDtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gMDtcbiAgfVxuXG4gIG1hbmFnZVByb2dyZXNzSW5kaWNhdG9ycygpIHtcbiAgICBjb25zdCB3aWR0aCA9ICgxMDAgLyB0aGlzLmRlZmF1bHRUaW1lKSAqIHRoaXMuY3VycmVudFRpbWU7XG4gICAgdGhpcy5pbmRpY2F0b3JOb2Rlcy5mb3JFYWNoKChpbmRpY2F0b3IsIGluZGV4KSA9PiB7XG4gICAgICBpbmRpY2F0b3JcbiAgICAgICAgLmdldE5vZGUoKVxuICAgICAgICAuc3R5bGUuc2V0UHJvcGVydHkoJy0tcHJvZ3Jlc3Mtd2lkdGgnLCBgJHtpbmRleCA9PT0gdGhpcy5jdXJyZW50U2xpZGUgPyB3aWR0aCA6IDB9JWApO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi4vY2xhc3Nlcy9Ob2RlQ3JlYXRlJztcbmltcG9ydCBWaWV3IGZyb20gJy4uL2NsYXNzZXMvVmlldyc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXJWaWV3IGZyb20gJy4vUHJvZ3Jlc3NCYXJWaWV3JztcbmltcG9ydCBzbGlkZXJEYXRhIGZyb20gJy4vc2xpZGVyLWRhdGEnO1xuXG5jb25zdCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2b3VyaXRlLWNvZmZlZScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXJWaWV3IGV4dGVuZHMgVmlldyB7XG4gIHNsaWRlckZyYW1lO1xuXG4gIGN1cnJlbnRTbGlkZUlkID0gMDtcblxuICBpc0FsbG93ZWRUb01vdmUgPSB0cnVlO1xuXG4gIHByb2dyZXNzQmFyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnc2xpZGVyJ10sXG4gICAgfTtcbiAgICBzdXBlcihwYXJhbXMpO1xuICAgIHBhcmVudC5hcHBlbmQodGhpcy52aWV3Tm9kZS5nZXROb2RlKCkpO1xuICAgIHRoaXMuY29uZmlndXJlVmlldygpO1xuICAgIHRoaXMuZ2VuZXJhdGVTbGlkZSgpO1xuICB9XG5cbiAgY29uZmlndXJlVmlldygpIHtcbiAgICBjb25zdCBwcmV2ID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICBjc3M6IFsnc2xpZGVyLWJ1dHRvbl9fcHJldicsICdzbGlkZXItYnV0dG9uJ10sXG4gICAgICBjYWxsYmFjazogdGhpcy5tb3ZlU2xpZGVUb1JpZ2h0LmJpbmQodGhpcyksXG4gICAgfSk7XG4gICAgY29uc3Qgc2xpZGVyRnJhbWUgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydzbGlkZXItZnJhbWUnXSxcbiAgICB9KTtcbiAgICB0aGlzLnNsaWRlckZyYW1lID0gc2xpZGVyRnJhbWU7XG4gICAgY29uc3QgbmV4dCA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgY3NzOiBbJ3NsaWRlci1idXR0b25fX25leHQnLCAnc2xpZGVyLWJ1dHRvbiddLFxuICAgICAgY2FsbGJhY2s6IHRoaXMubW92ZVNsaWRlVG9MZWZ0LmJpbmQodGhpcyksXG4gICAgfSk7XG4gICAgcHJldi5nZXROb2RlKCkuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiPlxuICAgIDxwYXRoIGQ9XCJNNiAxMkgxOC41TTE4LjUgMTJMMTIuNSA2TTE4LjUgMTJMMTIuNSAxOFwiIHN0cm9rZT1cIiM0MDNGM0RcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gIDwvc3ZnPmA7XG4gICAgbmV4dC5nZXROb2RlKCkuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiPlxuICAgIDxwYXRoIGQ9XCJNNiAxMkgxOC41TTE4LjUgMTJMMTIuNSA2TTE4LjUgMTJMMTIuNSAxOFwiIHN0cm9rZT1cIiM0MDNGM0RcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gIDwvc3ZnPmA7XG4gICAgdGhpcy5wcm9ncmVzc0JhciA9IG5ldyBQcm9ncmVzc0JhclZpZXcoc2xpZGVyRGF0YS5sZW5ndGgsIHRoaXMubW92ZVNsaWRlVG9MZWZ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKHByZXYsIHNsaWRlckZyYW1lLCB0aGlzLnByb2dyZXNzQmFyLmdldEVsZW1lbnQoKSwgbmV4dCk7XG4gIH1cblxuICBnZW5lcmF0ZVNsaWRlKCkge1xuICAgIHRoaXMudmFsaWRhdGVJZCgpO1xuICAgIGNvbnN0IGlkID0gdGhpcy5jdXJyZW50U2xpZGVJZDtcbiAgICBjb25zdCBzbGlkZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdhcnRpY2xlJyxcbiAgICAgIGNzczogWydzbGlkZXJfX3NsaWRlJywgJ3NsaWRlJ10sXG4gICAgfSk7XG4gICAgc2xpZGUuc2V0Q2FsbGJhY2sodGhpcy5tYWtlU3dpcGUuYmluZCh0aGlzKSwgJ3RvdWNoc3RhcnQnKTtcbiAgICBzbGlkZS5zZXRDYWxsYmFjaygoKSA9PiB0aGlzLnByb2dyZXNzQmFyLnBhdXNlQXV0b21hdGljU2Nyb2xsKCksICdtb3VzZWVudGVyJyk7XG4gICAgc2xpZGUuc2V0Q2FsbGJhY2soKCkgPT4gdGhpcy5wcm9ncmVzc0Jhci5jb250aW51ZUF1dG9tYXRpY1Njcm9sbCgpLCAnbW91c2VsZWF2ZScpO1xuICAgIGNvbnN0IGltYWdlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnc2xpZGVfX2ltYWdlJ10sXG4gICAgfSk7XG4gICAgaW1hZ2UuZ2V0Tm9kZSgpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7c2xpZGVyRGF0YVtpZF0uaW1hZ2V9JylgO1xuICAgIGNvbnN0IHRpdGxlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2gzJyxcbiAgICAgIGNzczogWydzbGlkZV9fdGl0bGUnXSxcbiAgICAgIHRleHQ6IHNsaWRlckRhdGFbaWRdLnRpdGxlLFxuICAgIH0pO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ3AnLFxuICAgICAgY3NzOiBbJ3NsaWRlX19kZXNjcmlwdGlvbiddLFxuICAgICAgdGV4dDogc2xpZGVyRGF0YVtpZF0uZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gICAgY29uc3QgcHJpY2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnc2xpZGVfX3ByaWNlJ10sXG4gICAgICB0ZXh0OiBgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgICAgfSkuZm9ybWF0KHNsaWRlckRhdGFbaWRdLnByaWNlKX1gLFxuICAgIH0pO1xuICAgIHNsaWRlLmFkZElubmVyTm9kZShpbWFnZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBwcmljZSk7XG4gICAgdGhpcy5zbGlkZXJGcmFtZS5hZGRJbm5lck5vZGUoc2xpZGUpO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc3dpdGNoU2xpZGUodGhpcy5jdXJyZW50U2xpZGVJZCk7XG4gIH1cblxuICBtb3ZlU2xpZGUobmV3U2xpZGVDbGFzcywgY3VycmVudFNsaWRlQ2xhc3MpIHtcbiAgICBpZiAodGhpcy5pc0FsbG93ZWRUb01vdmUpIHtcbiAgICAgIHRoaXMuaXNBbGxvd2VkVG9Nb3ZlID0gZmFsc2U7XG4gICAgICB0aGlzLmdlbmVyYXRlU2xpZGUoKTtcbiAgICAgIGNvbnN0IFtjdXJyZW50U2xpZGUsIG5ld1NsaWRlXSA9IHRoaXMuc2xpZGVyRnJhbWUuZ2V0Tm9kZSgpLmNoaWxkcmVuO1xuICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5hZGQoY3VycmVudFNsaWRlQ2xhc3MpO1xuICAgICAgbmV3U2xpZGUuY2xhc3NMaXN0LmFkZChuZXdTbGlkZUNsYXNzKTtcbiAgICAgIGN1cnJlbnRTbGlkZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgICAgbmV3U2xpZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICBuZXdTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZV9mcm9tLXJpZ2h0JywgJ3NsaWRlX2Zyb20tbGVmdCcpO1xuICAgICAgICB0aGlzLmlzQWxsb3dlZFRvTW92ZSA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUlkKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTbGlkZUlkIDwgMCkge1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVJZCA9IHNsaWRlckRhdGEubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3VycmVudFNsaWRlSWQgPiBzbGlkZXJEYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlSWQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIG1ha2VTd2lwZShzdGFydEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzQWxsb3dlZFRvTW92ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb2dyZXNzQmFyLnBhdXNlQXV0b21hdGljU2Nyb2xsKCk7XG4gICAgY29uc3Qgc3RhcnQgPSBzdGFydEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIGNvbnN0IHN0YXJ0WCA9IHN0YXJ0LmNsaWVudFg7XG4gICAgY29uc3Qgc3RhcnRZID0gc3RhcnQuY2xpZW50WTtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIGNvbnN0IGVuZFN3aXBlID0gKGVuZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBlbmQgPSBlbmRFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgIGNvbnN0IGRpc3RhbmNlWCA9IGVuZC5jbGllbnRYIC0gc3RhcnRYO1xuICAgICAgY29uc3QgZGlzdGFuY2VZID0gZW5kLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICBjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWU7XG4gICAgICB0aGlzLnByb2dyZXNzQmFyLmNvbnRpbnVlQXV0b21hdGljU2Nyb2xsKCk7XG4gICAgICBzdGFydC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlbmRTd2lwZSk7XG4gICAgICBpZiAoZW5kVGltZSA+IDUwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2VYKSA+PSAxMDAgJiYgTWF0aC5hYnMoZGlzdGFuY2VZIDw9IDEwMCkpIHtcbiAgICAgICAgaWYgKGRpc3RhbmNlWCA+IDApIHtcbiAgICAgICAgICB0aGlzLm1vdmVTbGlkZVRvUmlnaHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vdmVTbGlkZVRvTGVmdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBzdGFydC50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlbmRTd2lwZSk7XG4gIH1cblxuICBtb3ZlU2xpZGVUb1JpZ2h0KCkge1xuICAgIGlmICh0aGlzLmlzQWxsb3dlZFRvTW92ZSkge1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVJZCAtPSAxO1xuICAgICAgdGhpcy5tb3ZlU2xpZGUoJ3NsaWRlX2Zyb20tbGVmdCcsICdzbGlkZV90by1yaWdodCcpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVTbGlkZVRvTGVmdCgpIHtcbiAgICBpZiAodGhpcy5pc0FsbG93ZWRUb01vdmUpIHtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlSWQgKz0gMTtcbiAgICAgIHRoaXMubW92ZVNsaWRlKCdzbGlkZV9mcm9tLXJpZ2h0JywgJ3NsaWRlX3RvLWxlZnQnKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzbGlkZXJJbWcxIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9zbGlkZXIvY29mZmVlLXNsaWRlci0xLnBuZyc7XG5pbXBvcnQgc2xpZGVySW1nMiBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2Uvc2xpZGVyL2NvZmZlZS1zbGlkZXItMi5wbmcnO1xuaW1wb3J0IHNsaWRlckltZzMgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL3NsaWRlci9jb2ZmZWUtc2xpZGVyLTMucG5nJztcblxuY29uc3Qgc2xpZGVyRGF0YSA9IFtcbiAge1xuICAgIHRpdGxlOiAnU+KAmW1vcmVzIEZyYXBwdWNjaW5vJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGlzIG5ldyBkcmluayB0YWtlcyBhbiBlc3ByZXNzbyBhbmQgbWl4ZXMgaXQgd2l0aCBicm93biBzdWdhciBhbmQgY2lubmFtb24gYmVmb3JlIGJlaW5nIHRvcHBlZCB3aXRoIG9hdCBtaWxrLicsXG4gICAgcHJpY2U6IDUuNSxcbiAgICBpbWFnZTogc2xpZGVySW1nMSxcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnQ2FyYW1lbCBNYWNjaGlhdG8nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0ZyYWdyYW50IGFuZCB1bmlxdWUgY2xhc3NpYyBlc3ByZXNzbyB3aXRoIHJpY2ggY2FyYW1lbC1wZWFudXQgc3lydXAsIHdpdGggY3JlYW0gdW5kZXIgd2hpcHBlZCB0aGljayBmb2FtLicsXG4gICAgcHJpY2U6IDUsXG4gICAgaW1hZ2U6IHNsaWRlckltZzIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0ljZSBjb2ZmZWUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0EgcG9wdWxhciBzdW1tZXIgZHJpbmsgdGhhdCB0b25lcyBhbmQgaW52aWdvcmF0ZXMuIFByZXBhcmVkIGZyb20gY29mZmVlLCBtaWxrIGFuZCBpY2UuJyxcbiAgICBwcmljZTogNC41LFxuICAgIGltYWdlOiBzbGlkZXJJbWczLFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVyRGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9ob21lLnNjc3MnO1xuaW1wb3J0IFNsaWRlclZpZXcgZnJvbSAnLi4vanMvc2xpZGVyL1NsaWRlcic7XG5pbXBvcnQgQnVyZ2VyVmlldyBmcm9tICcuLi9qcy9idXJnZXIvQnVyZ2VyJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyVmlldygpO1xuY29uc3QgYnVyZ2VyID0gbmV3IEJ1cmdlclZpZXcodHJ1ZSk7XG5cbmNvbnNvbGUubG9nKCfQktGB0LUg0L/Rg9C90LrRgtGLINCi0Jcg0LLRi9C/0L7Qu9C90LXQvdGLISEhJyk7XG5jb25zb2xlLmxvZyhcbiAgJ9Ch0JLQkNCZ0J/QqyDQoNCV0JDQm9CY0JfQntCS0JDQndCrINCi0J7Qm9Cs0JrQniDQlNCb0K8g0JzQntCR0JjQm9Cs0J3QntCZINCS0JXQoNCh0JjQmCAtINCh0J7Qk9Cb0JDQodCd0J4g0KLQlyAo0JDQndCY0JzQkNCm0JjQryDQoSDQn9Cg0JjQnNCV0KDQntCcINCd0JUg0K/QktCb0K/QldCi0KHQryDQmtCg0JjQotCV0KDQmNCV0Jwg0JTQm9CvINCf0KDQntCS0JXQoNCa0JgsINCQINCi0JDQmiDQltCVLCDQodCS0JDQmdCf0Ksg0J3QlSDQr9CS0JvQr9Cu0KLQodCvINCe0JbQmNCU0JDQldCc0KvQnCDQn9Ce0JLQldCU0JXQndCY0JXQnCDQlNCb0K8g0JTQldCh0JrQotCe0J/QkCkhISEg0JTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0L7RgtC60YDRi9Cy0LDQudGC0LUgZGV2dG9vbHMg0Lgg0L/QtdGA0LXRhdC+0LTQuNGC0LUg0LIg0LzQvtCx0LjQu9GM0L3Ri9C5INGA0LXQttC40LwuIFxcbtCh0L/QsNGB0LjQsdC+INC4INGD0LTQsNGH0LghJ1xuKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==