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
    this.pauseAutomaticScroll();
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
    start.target.removeEventListener('touchstart', this.makeSwipe);
    setTimeout(() => {
      start.target.addEventListener('touchstart', this.makeSwipe);
    }, 200);
    const endSwipe = (endEvent) => {
      const end = endEvent.changedTouches[0];
      const distanceX = end.clientX - startX;
      const distanceY = end.clientY - startY;
      const endTime = new Date().getTime() - startTime;
      setTimeout(() => {
        this.progressBar.continueAutomaticScroll();
      }, 200);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FtQztBQUNhOztBQUVqQyx5QkFBeUIscURBQUk7QUFDNUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixPQUFPO0FBQ1AsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixPQUFPO0FBQ1AsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixPQUFPO0FBQ1AsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxVQUFVLDJEQUFXO0FBQ3JCO0FBQ0Esc0NBQXNDLDZCQUE2QjtBQUNuRTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOUVlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRXVDOztBQUV4QjtBQUNmOztBQUVBO0FBQ0Esd0JBQXdCLG1EQUFXO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsbURBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNnRDtBQUNiOztBQUVwQiw4QkFBOEIscURBQUk7QUFDakQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsMkRBQVc7QUFDL0I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWSwyREFBVztBQUN2QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdDQUF3QztBQUMxRixLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFZ0Q7QUFDYjtBQUNhO0FBQ1Q7O0FBRXZDOztBQUVlLHlCQUF5QixxREFBSTtBQUM1Qzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQiwyREFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNEJBQTRCLDJEQUFXO0FBQ3ZDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUIsMkRBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix3REFBZSxDQUFDLDJEQUFpQjtBQUM1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyREFBVztBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyREFBVztBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMLG9EQUFvRCxvREFBVSxXQUFXO0FBQ3pFLHNCQUFzQiwyREFBVztBQUNqQztBQUNBO0FBQ0EsWUFBWSxvREFBVTtBQUN0QixLQUFLO0FBQ0wsNEJBQTRCLDJEQUFXO0FBQ3ZDO0FBQ0E7QUFDQSxZQUFZLG9EQUFVO0FBQ3RCLEtBQUs7QUFDTCxzQkFBc0IsMkRBQVc7QUFDakM7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsT0FBTyxTQUFTLG9EQUFVLFlBQVk7QUFDdEMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLDJEQUFpQjtBQUM3QztBQUNBLDhCQUE4QiwyREFBaUI7QUFDL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0S3VFO0FBQ0E7QUFDQTs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxRUFBVTtBQUNyQixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUVBQVU7QUFDckIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFFQUFVO0FBQ3JCLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM1QjFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7OztBQ2ZxQjtBQUN3QjtBQUNBOztBQUU3QztBQUNBLG1CQUFtQix5REFBVTtBQUM3QixtQkFBbUIseURBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9ob21lL2hvbWUuc2Nzcz82YTQ2Iiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL2J1cmdlci9CdXJnZXIuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvY2xhc3Nlcy9Ob2RlQ3JlYXRlLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL2NsYXNzZXMvVmlldy5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9zbGlkZXIvUHJvZ3Jlc3NCYXJWaWV3LmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL3NsaWRlci9TbGlkZXIuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvc2xpZGVyL3NsaWRlci1kYXRhLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9ob21lL2hvbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcbmltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuLi9jbGFzc2VzL05vZGVDcmVhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXJnZXJWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGJ1cmdlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXInKTtcblxuICBpc09wZW5lZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGlzSG9tZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnYnVyZ2VyLW1lbnUnXSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLm1hbmFnZU1lbnUoKSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgdGhpcy5nZW5lcmF0ZU1lbnUoaXNIb21lKTtcbiAgICB0aGlzLmJ1cmdlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubWFuYWdlTWVudS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuaW5uZXJXaWR0aCA+IDc2OCAmJiB0aGlzLmlzT3BlbmVkKSB7XG4gICAgICAgIHRoaXMubWFuYWdlTWVudSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2VuZXJhdGVNZW51KGlzSG9tZSkge1xuICAgIGNvbnN0IHN0YXJ0SWQgPSBpc0hvbWUgPyAnJyA6ICcuL2hvbWUuaHRtbCc7XG4gICAgY29uc3QgbGlua3MgPSBbXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJ10sXG4gICAgICAgIHRleHQ6ICdGYXZvcml0ZSBjb2ZmZWUnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNmYXZvdXJpdGUtY29mZmVlYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnQWJvdXQnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNhYm91dGAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ01vYmlsZSBhcHAnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNtb2JpbGUtYXBwYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnQ29udGFjdCB1cycsXG4gICAgICAgIGhyZWY6IGAjZm9vdGVyYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluaycsIGAke2lzSG9tZSA/ICcxJyA6ICdub25lLWV2ZW50cyd9YF0sXG4gICAgICAgIHRleHQ6ICdNZW51JyxcbiAgICAgICAgaHJlZjogJy4vbWVudS5odG1sJyxcbiAgICAgIH0pLFxuICAgIF07XG4gICAgdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoLi4ubGlua3MpO1xuICB9XG5cbiAgbWFuYWdlTWVudSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpLmNsYXNzTGlzdC5hZGQoJ2J1cmdlci1tZW51X29wZW4nKTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdOb2RlLnNldENsYXNzTmFtZXMoWydidXJnZXItbWVudSddKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKS5yZW1vdmUoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2Jsb2NrZWQnKTtcbiAgICB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdidXJnZXJfYWN0aXZlJyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGVDcmVhdG9yIHtcbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5ub2RlID0gdGhpcy5jcmVhdGVOb2RlKHBhcmFtcyk7XG4gIH1cblxuICBnZXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGU7XG4gIH1cblxuICBjcmVhdGVOb2RlKHBhcmFtcykge1xuICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocGFyYW1zLnRhZyk7XG4gICAgdGhpcy5zZXRDbGFzc05hbWVzKHBhcmFtcy5jc3MpO1xuICAgIHRoaXMuc2V0VGV4dENvbnRlbnQocGFyYW1zLnRleHQpO1xuICAgIHRoaXMuc2V0SWQocGFyYW1zLmlkKTtcbiAgICBpZiAocGFyYW1zLmNhbGxiYWNrKSB0aGlzLnNldENhbGxiYWNrKHBhcmFtcy5jYWxsYmFjayk7XG4gICAgaWYgKHBhcmFtcy5ocmVmKSB0aGlzLnNldEhyZWYocGFyYW1zLmhyZWYpO1xuICAgIHJldHVybiB0aGlzLm5vZGU7XG4gIH1cblxuICBzZXRIcmVmKHN0cmluZykge1xuICAgIHRoaXMubm9kZS5ocmVmID0gc3RyaW5nO1xuICB9XG5cbiAgc2V0Q2xhc3NOYW1lcyhjc3NMaXN0KSB7XG4gICAgaWYgKGNzc0xpc3QpIHtcbiAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAnJztcbiAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKC4uLmNzc0xpc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRleHRDb250ZW50KHRleHQpIHtcbiAgICBpZiAodGV4dCkgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfVxuXG4gIHNldENhbGxiYWNrKGNhbGxiYWNrLCBoYW5kbGVyID0gJ2NsaWNrJykge1xuICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKGhhbmRsZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNldElkKGlkKSB7XG4gICAgaWYgKGlkKSB0aGlzLm5vZGUuaWQgPSBpZDtcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgYWRkSW5uZXJOb2RlKC4uLmxpc3QpIHtcbiAgICBsaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZUNyZWF0b3IpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZChub2RlLmdldE5vZGUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJlcGVuZElubmVyTm9kZSguLi5saXN0KSB7XG4gICAgbGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGVDcmVhdG9yKSB7XG4gICAgICAgIHRoaXMubm9kZS5wcmVwZW5kKG5vZGUuZ2V0Tm9kZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm9kZS5wcmVwZW5kKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQWxsQ2hpbGRyZW4oKSB7XG4gICAgd2hpbGUgKHRoaXMubm9kZS5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU5vZGUoKSB7XG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi9Ob2RlQ3JlYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIG1vZGFsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLnZpZXdOb2RlID0gbmV3IE5vZGVDcmVhdG9yKHBhcmFtcyk7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKTtcbiAgfVxuXG4gIGFkZFZpZXdJbnNpZGUoLi4udmlldykge1xuICAgIHZpZXcuZm9yRWFjaCgoaW5zdCkgPT4gdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoaW5zdC5nZXRFbGVtZW50KCkpKTtcbiAgfVxuXG4gIHNob3dNb2RhbCgpIHtcbiAgICBjb25zdCBtb2RhbCA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsJ10sXG4gICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5jbG9zZU1vZGFsKCksXG4gICAgfSk7XG4gICAgbW9kYWwuYWRkSW5uZXJOb2RlKHRoaXMudmlld05vZGUpO1xuICAgIHRoaXMubW9kYWwgPSBtb2RhbDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLm1vZGFsLmdldE5vZGUoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdibG9ja2VkJyk7XG4gIH1cblxuICBjbG9zZU1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICB0aGlzLm1vZGFsLmdldE5vZGUoKS5yZW1vdmUoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYmxvY2tlZCcpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzc0JhclZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY3VycmVudFRpbWUgPSAwO1xuXG4gIGRlZmF1bHRUaW1lID0gNztcblxuICBpbmRpY2F0b3JOb2RlcztcblxuICBjdXJyZW50U2xpZGUgPSAwO1xuXG4gIHRpbWVyO1xuXG4gIGNvbnN0cnVjdG9yKHNsaWRlckNvdW50LCBtb3ZlU2xpZGUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICd1bCcsXG4gICAgICBjc3M6IFsnc2xpZGVyX19wcm9ncmVzcy1iYXInLCAncHJvZ3Jlc3MtYmFyJ10sXG4gICAgfTtcbiAgICBzdXBlcihwYXJhbXMpO1xuICAgIHRoaXMubW92ZVNsaWRlID0gbW92ZVNsaWRlO1xuICAgIHRoaXMuY29uZmlndXJlVmlldyhzbGlkZXJDb3VudCk7XG4gICAgdGhpcy5hdXRvbWF0aWNTY3JvbGwoKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVZpZXcoc2xpZGVyQ291bnQpIHtcbiAgICBjb25zdCBiYXIgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAndWwnLFxuICAgICAgY3NzOiBbJ3NsaWRlcl9fcHJvZ3Jlc3MtYmFyJywgJ3Byb2dyZXNzLWJhciddLFxuICAgIH0pO1xuICAgIHRoaXMuaW5kaWNhdG9yTm9kZXMgPSBuZXcgQXJyYXkoc2xpZGVyQ291bnQpLmZpbGwoMCkubWFwKFxuICAgICAgKCkgPT5cbiAgICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgICB0YWc6ICdsaScsXG4gICAgICAgICAgY3NzOiBbJ3Byb2dyZXNzLWJhcl9faW5kaWNhdG9yJ10sXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBiYXIuYWRkSW5uZXJOb2RlKC4uLnRoaXMuaW5kaWNhdG9yTm9kZXMpO1xuICAgIHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKGJhcik7XG4gIH1cblxuICBhdXRvbWF0aWNTY3JvbGwoKSB7XG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50VGltZSArPSAwLjE7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VGltZSA8PSB0aGlzLmRlZmF1bHRUaW1lKSB7XG4gICAgICAgIHRoaXMubWFuYWdlUHJvZ3Jlc3NJbmRpY2F0b3JzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vdmVTbGlkZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5hdXRvbWF0aWNTY3JvbGwoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcGF1c2VBdXRvbWF0aWNTY3JvbGwoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgfVxuXG4gIGNvbnRpbnVlQXV0b21hdGljU2Nyb2xsKCkge1xuICAgIHRoaXMucGF1c2VBdXRvbWF0aWNTY3JvbGwoKTtcbiAgICB0aGlzLmF1dG9tYXRpY1Njcm9sbCgpO1xuICB9XG5cbiAgc3dpdGNoU2xpZGUoaWQpIHtcbiAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IGlkO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICB9XG5cbiAgbWFuYWdlUHJvZ3Jlc3NJbmRpY2F0b3JzKCkge1xuICAgIGNvbnN0IHdpZHRoID0gKDEwMCAvIHRoaXMuZGVmYXVsdFRpbWUpICogdGhpcy5jdXJyZW50VGltZTtcbiAgICB0aGlzLmluZGljYXRvck5vZGVzLmZvckVhY2goKGluZGljYXRvciwgaW5kZXgpID0+IHtcbiAgICAgIGluZGljYXRvclxuICAgICAgICAuZ2V0Tm9kZSgpXG4gICAgICAgIC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wcm9ncmVzcy13aWR0aCcsIGAke2luZGV4ID09PSB0aGlzLmN1cnJlbnRTbGlkZSA/IHdpZHRoIDogMH0lYCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuLi9jbGFzc2VzL05vZGVDcmVhdGUnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcbmltcG9ydCBQcm9ncmVzc0JhclZpZXcgZnJvbSAnLi9Qcm9ncmVzc0JhclZpZXcnO1xuaW1wb3J0IHNsaWRlckRhdGEgZnJvbSAnLi9zbGlkZXItZGF0YSc7XG5cbmNvbnN0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZvdXJpdGUtY29mZmVlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlclZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgc2xpZGVyRnJhbWU7XG5cbiAgY3VycmVudFNsaWRlSWQgPSAwO1xuXG4gIGlzQWxsb3dlZFRvTW92ZSA9IHRydWU7XG5cbiAgcHJvZ3Jlc3NCYXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydzbGlkZXInXSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgcGFyZW50LmFwcGVuZCh0aGlzLnZpZXdOb2RlLmdldE5vZGUoKSk7XG4gICAgdGhpcy5jb25maWd1cmVWaWV3KCk7XG4gICAgdGhpcy5nZW5lcmF0ZVNsaWRlKCk7XG4gIH1cblxuICBjb25maWd1cmVWaWV3KCkge1xuICAgIGNvbnN0IHByZXYgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNzczogWydzbGlkZXItYnV0dG9uX19wcmV2JywgJ3NsaWRlci1idXR0b24nXSxcbiAgICAgIGNhbGxiYWNrOiB0aGlzLm1vdmVTbGlkZVRvUmlnaHQuYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgICBjb25zdCBzbGlkZXJGcmFtZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ3NsaWRlci1mcmFtZSddLFxuICAgIH0pO1xuICAgIHRoaXMuc2xpZGVyRnJhbWUgPSBzbGlkZXJGcmFtZTtcbiAgICBjb25zdCBuZXh0ID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICBjc3M6IFsnc2xpZGVyLWJ1dHRvbl9fbmV4dCcsICdzbGlkZXItYnV0dG9uJ10sXG4gICAgICBjYWxsYmFjazogdGhpcy5tb3ZlU2xpZGVUb0xlZnQuYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgICBwcmV2LmdldE5vZGUoKS5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG4gICAgPHBhdGggZD1cIk02IDEySDE4LjVNMTguNSAxMkwxMi41IDZNMTguNSAxMkwxMi41IDE4XCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgPC9zdmc+YDtcbiAgICBuZXh0LmdldE5vZGUoKS5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG4gICAgPHBhdGggZD1cIk02IDEySDE4LjVNMTguNSAxMkwxMi41IDZNMTguNSAxMkwxMi41IDE4XCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgPC9zdmc+YDtcbiAgICB0aGlzLnByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyVmlldyhzbGlkZXJEYXRhLmxlbmd0aCwgdGhpcy5tb3ZlU2xpZGVUb0xlZnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUocHJldiwgc2xpZGVyRnJhbWUsIHRoaXMucHJvZ3Jlc3NCYXIuZ2V0RWxlbWVudCgpLCBuZXh0KTtcbiAgfVxuXG4gIGdlbmVyYXRlU2xpZGUoKSB7XG4gICAgdGhpcy52YWxpZGF0ZUlkKCk7XG4gICAgY29uc3QgaWQgPSB0aGlzLmN1cnJlbnRTbGlkZUlkO1xuICAgIGNvbnN0IHNsaWRlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2FydGljbGUnLFxuICAgICAgY3NzOiBbJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGUnXSxcbiAgICB9KTtcbiAgICBzbGlkZS5zZXRDYWxsYmFjayh0aGlzLm1ha2VTd2lwZS5iaW5kKHRoaXMpLCAndG91Y2hzdGFydCcpO1xuICAgIHNsaWRlLnNldENhbGxiYWNrKCgpID0+IHRoaXMucHJvZ3Jlc3NCYXIucGF1c2VBdXRvbWF0aWNTY3JvbGwoKSwgJ21vdXNlZW50ZXInKTtcbiAgICBzbGlkZS5zZXRDYWxsYmFjaygoKSA9PiB0aGlzLnByb2dyZXNzQmFyLmNvbnRpbnVlQXV0b21hdGljU2Nyb2xsKCksICdtb3VzZWxlYXZlJyk7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydzbGlkZV9faW1hZ2UnXSxcbiAgICB9KTtcbiAgICBpbWFnZS5nZXROb2RlKCkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtzbGlkZXJEYXRhW2lkXS5pbWFnZX0nKWA7XG4gICAgY29uc3QgdGl0bGUgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnaDMnLFxuICAgICAgY3NzOiBbJ3NsaWRlX190aXRsZSddLFxuICAgICAgdGV4dDogc2xpZGVyRGF0YVtpZF0udGl0bGUsXG4gICAgfSk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnc2xpZGVfX2Rlc2NyaXB0aW9uJ10sXG4gICAgICB0ZXh0OiBzbGlkZXJEYXRhW2lkXS5kZXNjcmlwdGlvbixcbiAgICB9KTtcbiAgICBjb25zdCBwcmljZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdwJyxcbiAgICAgIGNzczogWydzbGlkZV9fcHJpY2UnXSxcbiAgICAgIHRleHQ6IGAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICBjdXJyZW5jeTogJ1VTRCcsXG4gICAgICB9KS5mb3JtYXQoc2xpZGVyRGF0YVtpZF0ucHJpY2UpfWAsXG4gICAgfSk7XG4gICAgc2xpZGUuYWRkSW5uZXJOb2RlKGltYWdlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaWNlKTtcbiAgICB0aGlzLnNsaWRlckZyYW1lLmFkZElubmVyTm9kZShzbGlkZSk7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zd2l0Y2hTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZUlkKTtcbiAgfVxuXG4gIG1vdmVTbGlkZShuZXdTbGlkZUNsYXNzLCBjdXJyZW50U2xpZGVDbGFzcykge1xuICAgIGlmICh0aGlzLmlzQWxsb3dlZFRvTW92ZSkge1xuICAgICAgdGhpcy5pc0FsbG93ZWRUb01vdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVTbGlkZSgpO1xuICAgICAgY29uc3QgW2N1cnJlbnRTbGlkZSwgbmV3U2xpZGVdID0gdGhpcy5zbGlkZXJGcmFtZS5nZXROb2RlKCkuY2hpbGRyZW47XG4gICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZChjdXJyZW50U2xpZGVDbGFzcyk7XG4gICAgICBuZXdTbGlkZS5jbGFzc0xpc3QuYWRkKG5ld1NsaWRlQ2xhc3MpO1xuICAgICAgY3VycmVudFNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgICBuZXdTbGlkZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICAgIG5ld1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlX2Zyb20tcmlnaHQnLCAnc2xpZGVfZnJvbS1sZWZ0Jyk7XG4gICAgICAgIHRoaXMuaXNBbGxvd2VkVG9Nb3ZlID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlSWQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNsaWRlSWQgPCAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZUlkID0gc2xpZGVyRGF0YS5sZW5ndGggLSAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50U2xpZGVJZCA+IHNsaWRlckRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVJZCA9IDA7XG4gICAgfVxuICB9XG5cbiAgbWFrZVN3aXBlKHN0YXJ0RXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNBbGxvd2VkVG9Nb3ZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvZ3Jlc3NCYXIucGF1c2VBdXRvbWF0aWNTY3JvbGwoKTtcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0RXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgY29uc3Qgc3RhcnRYID0gc3RhcnQuY2xpZW50WDtcbiAgICBjb25zdCBzdGFydFkgPSBzdGFydC5jbGllbnRZO1xuICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHN0YXJ0LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5tYWtlU3dpcGUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3RhcnQudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm1ha2VTd2lwZSk7XG4gICAgfSwgMjAwKTtcbiAgICBjb25zdCBlbmRTd2lwZSA9IChlbmRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZW5kID0gZW5kRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICBjb25zdCBkaXN0YW5jZVggPSBlbmQuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICAgIGNvbnN0IGRpc3RhbmNlWSA9IGVuZC5jbGllbnRZIC0gc3RhcnRZO1xuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuY29udGludWVBdXRvbWF0aWNTY3JvbGwoKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgICBzdGFydC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlbmRTd2lwZSk7XG4gICAgICBpZiAoZW5kVGltZSA+IDUwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2VYKSA+PSAxMDAgJiYgTWF0aC5hYnMoZGlzdGFuY2VZIDw9IDEwMCkpIHtcbiAgICAgICAgaWYgKGRpc3RhbmNlWCA+IDApIHtcbiAgICAgICAgICB0aGlzLm1vdmVTbGlkZVRvUmlnaHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vdmVTbGlkZVRvTGVmdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBzdGFydC50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlbmRTd2lwZSk7XG4gIH1cblxuICBtb3ZlU2xpZGVUb1JpZ2h0KCkge1xuICAgIGlmICh0aGlzLmlzQWxsb3dlZFRvTW92ZSkge1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVJZCAtPSAxO1xuICAgICAgdGhpcy5tb3ZlU2xpZGUoJ3NsaWRlX2Zyb20tbGVmdCcsICdzbGlkZV90by1yaWdodCcpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVTbGlkZVRvTGVmdCgpIHtcbiAgICBpZiAodGhpcy5pc0FsbG93ZWRUb01vdmUpIHtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlSWQgKz0gMTtcbiAgICAgIHRoaXMubW92ZVNsaWRlKCdzbGlkZV9mcm9tLXJpZ2h0JywgJ3NsaWRlX3RvLWxlZnQnKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzbGlkZXJJbWcxIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9zbGlkZXIvY29mZmVlLXNsaWRlci0xLnBuZyc7XG5pbXBvcnQgc2xpZGVySW1nMiBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2Uvc2xpZGVyL2NvZmZlZS1zbGlkZXItMi5wbmcnO1xuaW1wb3J0IHNsaWRlckltZzMgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL3NsaWRlci9jb2ZmZWUtc2xpZGVyLTMucG5nJztcblxuY29uc3Qgc2xpZGVyRGF0YSA9IFtcbiAge1xuICAgIHRpdGxlOiAnU+KAmW1vcmVzIEZyYXBwdWNjaW5vJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGlzIG5ldyBkcmluayB0YWtlcyBhbiBlc3ByZXNzbyBhbmQgbWl4ZXMgaXQgd2l0aCBicm93biBzdWdhciBhbmQgY2lubmFtb24gYmVmb3JlIGJlaW5nIHRvcHBlZCB3aXRoIG9hdCBtaWxrLicsXG4gICAgcHJpY2U6IDUuNSxcbiAgICBpbWFnZTogc2xpZGVySW1nMSxcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnQ2FyYW1lbCBNYWNjaGlhdG8nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0ZyYWdyYW50IGFuZCB1bmlxdWUgY2xhc3NpYyBlc3ByZXNzbyB3aXRoIHJpY2ggY2FyYW1lbC1wZWFudXQgc3lydXAsIHdpdGggY3JlYW0gdW5kZXIgd2hpcHBlZCB0aGljayBmb2FtLicsXG4gICAgcHJpY2U6IDUsXG4gICAgaW1hZ2U6IHNsaWRlckltZzIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0ljZSBjb2ZmZWUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0EgcG9wdWxhciBzdW1tZXIgZHJpbmsgdGhhdCB0b25lcyBhbmQgaW52aWdvcmF0ZXMuIFByZXBhcmVkIGZyb20gY29mZmVlLCBtaWxrIGFuZCBpY2UuJyxcbiAgICBwcmljZTogNC41LFxuICAgIGltYWdlOiBzbGlkZXJJbWczLFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVyRGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9ob21lLnNjc3MnO1xuaW1wb3J0IFNsaWRlclZpZXcgZnJvbSAnLi4vanMvc2xpZGVyL1NsaWRlcic7XG5pbXBvcnQgQnVyZ2VyVmlldyBmcm9tICcuLi9qcy9idXJnZXIvQnVyZ2VyJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyVmlldygpO1xuY29uc3QgYnVyZ2VyID0gbmV3IEJ1cmdlclZpZXcodHJ1ZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=