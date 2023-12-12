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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakt1RTtBQUNBO0FBQ0E7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUVBQVU7QUFDckIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFFQUFVO0FBQ3JCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxRUFBVTtBQUNyQixHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNUIxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7QUNmcUI7QUFDd0I7QUFDQTs7QUFFN0M7QUFDQSxtQkFBbUIseURBQVU7QUFDN0IsbUJBQW1CLHlEQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvaG9tZS9ob21lLnNjc3M/NmE0NiIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9idXJnZXIvQnVyZ2VyLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL2NsYXNzZXMvTm9kZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9jbGFzc2VzL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvc2xpZGVyL1Byb2dyZXNzQmFyVmlldy5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9zbGlkZXIvU2xpZGVyLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL3NsaWRlci9zbGlkZXItZGF0YS5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvaG9tZS9ob21lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBWaWV3IGZyb20gJy4uL2NsYXNzZXMvVmlldyc7XG5pbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi4vY2xhc3Nlcy9Ob2RlQ3JlYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVyZ2VyVmlldyBleHRlbmRzIFZpZXcge1xuICBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnVyZ2VyJyk7XG5cbiAgaXNPcGVuZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihpc0hvbWUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ2J1cmdlci1tZW51J10sXG4gICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5tYW5hZ2VNZW51KCksXG4gICAgfTtcbiAgICBzdXBlcihwYXJhbXMpO1xuICAgIHRoaXMuZ2VuZXJhdGVNZW51KGlzSG9tZSk7XG4gICAgdGhpcy5idXJnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm1hbmFnZU1lbnUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB7XG4gICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmlubmVyV2lkdGggPiA3NjggJiYgdGhpcy5pc09wZW5lZCkge1xuICAgICAgICB0aGlzLm1hbmFnZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdlbmVyYXRlTWVudShpc0hvbWUpIHtcbiAgICBjb25zdCBzdGFydElkID0gaXNIb21lID8gJycgOiAnLi9ob21lLmh0bWwnO1xuICAgIGNvbnN0IGxpbmtzID0gW1xuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnRmF2b3JpdGUgY29mZmVlJyxcbiAgICAgICAgaHJlZjogYCR7c3RhcnRJZH0jZmF2b3VyaXRlLWNvZmZlZWAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ0Fib3V0JyxcbiAgICAgICAgaHJlZjogYCR7c3RhcnRJZH0jYWJvdXRgLFxuICAgICAgfSksXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJ10sXG4gICAgICAgIHRleHQ6ICdNb2JpbGUgYXBwJyxcbiAgICAgICAgaHJlZjogYCR7c3RhcnRJZH0jbW9iaWxlLWFwcGAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ0NvbnRhY3QgdXMnLFxuICAgICAgICBocmVmOiBgI2Zvb3RlcmAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnLCBgJHtpc0hvbWUgPyAnMScgOiAnbm9uZS1ldmVudHMnfWBdLFxuICAgICAgICB0ZXh0OiAnTWVudScsXG4gICAgICAgIGhyZWY6ICcuL21lbnUuaHRtbCcsXG4gICAgICB9KSxcbiAgICBdO1xuICAgIHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKC4uLmxpbmtzKTtcbiAgfVxuXG4gIG1hbmFnZU1lbnUoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLnZpZXdOb2RlLmdldE5vZGUoKSk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKS5jbGFzc0xpc3QuYWRkKCdidXJnZXItbWVudV9vcGVuJyk7XG4gICAgICB9LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3Tm9kZS5zZXRDbGFzc05hbWVzKFsnYnVyZ2VyLW1lbnUnXSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3Tm9kZS5nZXROb2RlKCkucmVtb3ZlKCk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgICB0aGlzLmlzT3BlbmVkID0gIXRoaXMuaXNPcGVuZWQ7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdibG9ja2VkJyk7XG4gICAgdGhpcy5idXJnZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnYnVyZ2VyX2FjdGl2ZScpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMubm9kZSA9IHRoaXMuY3JlYXRlTm9kZShwYXJhbXMpO1xuICB9XG5cbiAgZ2V0Tm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xuICB9XG5cbiAgY3JlYXRlTm9kZShwYXJhbXMpIHtcbiAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHBhcmFtcy50YWcpO1xuICAgIHRoaXMuc2V0Q2xhc3NOYW1lcyhwYXJhbXMuY3NzKTtcbiAgICB0aGlzLnNldFRleHRDb250ZW50KHBhcmFtcy50ZXh0KTtcbiAgICB0aGlzLnNldElkKHBhcmFtcy5pZCk7XG4gICAgaWYgKHBhcmFtcy5jYWxsYmFjaykgdGhpcy5zZXRDYWxsYmFjayhwYXJhbXMuY2FsbGJhY2spO1xuICAgIGlmIChwYXJhbXMuaHJlZikgdGhpcy5zZXRIcmVmKHBhcmFtcy5ocmVmKTtcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xuICB9XG5cbiAgc2V0SHJlZihzdHJpbmcpIHtcbiAgICB0aGlzLm5vZGUuaHJlZiA9IHN0cmluZztcbiAgfVxuXG4gIHNldENsYXNzTmFtZXMoY3NzTGlzdCkge1xuICAgIGlmIChjc3NMaXN0KSB7XG4gICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gJyc7XG4gICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZCguLi5jc3NMaXN0KTtcbiAgICB9XG4gIH1cblxuICBzZXRUZXh0Q29udGVudCh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH1cblxuICBzZXRDYWxsYmFjayhjYWxsYmFjaywgaGFuZGxlciA9ICdjbGljaycpIHtcbiAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihoYW5kbGVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXRJZChpZCkge1xuICAgIGlmIChpZCkgdGhpcy5ub2RlLmlkID0gaWQ7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIGFkZElubmVyTm9kZSguLi5saXN0KSB7XG4gICAgbGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGVDcmVhdG9yKSB7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmQobm9kZS5nZXROb2RlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZChub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByZXBlbmRJbm5lck5vZGUoLi4ubGlzdCkge1xuICAgIGxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBOb2RlQ3JlYXRvcikge1xuICAgICAgICB0aGlzLm5vZGUucHJlcGVuZChub2RlLmdldE5vZGUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vZGUucHJlcGVuZChub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUFsbENoaWxkcmVuKCkge1xuICAgIHdoaWxlICh0aGlzLm5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZS5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVOb2RlKCkge1xuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4vTm9kZUNyZWF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBtb2RhbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy52aWV3Tm9kZSA9IG5ldyBOb2RlQ3JlYXRvcihwYXJhbXMpO1xuICB9XG5cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3Tm9kZS5nZXROb2RlKCk7XG4gIH1cblxuICBhZGRWaWV3SW5zaWRlKC4uLnZpZXcpIHtcbiAgICB2aWV3LmZvckVhY2goKGluc3QpID0+IHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKGluc3QuZ2V0RWxlbWVudCgpKSk7XG4gIH1cblxuICBzaG93TW9kYWwoKSB7XG4gICAgY29uc3QgbW9kYWwgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydtb2RhbCddLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuY2xvc2VNb2RhbCgpLFxuICAgIH0pO1xuICAgIG1vZGFsLmFkZElubmVyTm9kZSh0aGlzLnZpZXdOb2RlKTtcbiAgICB0aGlzLm1vZGFsID0gbW9kYWw7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5tb2RhbC5nZXROb2RlKCkpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnYmxvY2tlZCcpO1xuICB9XG5cbiAgY2xvc2VNb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgdGhpcy5tb2RhbC5nZXROb2RlKCkucmVtb3ZlKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2NrZWQnKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuLi9jbGFzc2VzL05vZGVDcmVhdGUnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3Jlc3NCYXJWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGN1cnJlbnRUaW1lID0gMDtcblxuICBkZWZhdWx0VGltZSA9IDc7XG5cbiAgaW5kaWNhdG9yTm9kZXM7XG5cbiAgY3VycmVudFNsaWRlID0gMDtcblxuICB0aW1lcjtcblxuICBjb25zdHJ1Y3RvcihzbGlkZXJDb3VudCwgbW92ZVNsaWRlKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgdGFnOiAndWwnLFxuICAgICAgY3NzOiBbJ3NsaWRlcl9fcHJvZ3Jlc3MtYmFyJywgJ3Byb2dyZXNzLWJhciddLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICB0aGlzLm1vdmVTbGlkZSA9IG1vdmVTbGlkZTtcbiAgICB0aGlzLmNvbmZpZ3VyZVZpZXcoc2xpZGVyQ291bnQpO1xuICAgIHRoaXMuYXV0b21hdGljU2Nyb2xsKCk7XG4gIH1cblxuICBjb25maWd1cmVWaWV3KHNsaWRlckNvdW50KSB7XG4gICAgY29uc3QgYmFyID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ3VsJyxcbiAgICAgIGNzczogWydzbGlkZXJfX3Byb2dyZXNzLWJhcicsICdwcm9ncmVzcy1iYXInXSxcbiAgICB9KTtcbiAgICB0aGlzLmluZGljYXRvck5vZGVzID0gbmV3IEFycmF5KHNsaWRlckNvdW50KS5maWxsKDApLm1hcChcbiAgICAgICgpID0+XG4gICAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgICAgdGFnOiAnbGknLFxuICAgICAgICAgIGNzczogWydwcm9ncmVzcy1iYXJfX2luZGljYXRvciddLFxuICAgICAgICB9KVxuICAgICk7XG4gICAgYmFyLmFkZElubmVyTm9kZSguLi50aGlzLmluZGljYXRvck5vZGVzKTtcbiAgICB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZShiYXIpO1xuICB9XG5cbiAgYXV0b21hdGljU2Nyb2xsKCkge1xuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFRpbWUgKz0gMC4xO1xuICAgICAgaWYgKHRoaXMuY3VycmVudFRpbWUgPD0gdGhpcy5kZWZhdWx0VGltZSkge1xuICAgICAgICB0aGlzLm1hbmFnZVByb2dyZXNzSW5kaWNhdG9ycygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb3ZlU2xpZGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXV0b21hdGljU2Nyb2xsKCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHBhdXNlQXV0b21hdGljU2Nyb2xsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gIH1cblxuICBjb250aW51ZUF1dG9tYXRpY1Njcm9sbCgpIHtcbiAgICB0aGlzLmF1dG9tYXRpY1Njcm9sbCgpO1xuICB9XG5cbiAgc3dpdGNoU2xpZGUoaWQpIHtcbiAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IGlkO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICB9XG5cbiAgbWFuYWdlUHJvZ3Jlc3NJbmRpY2F0b3JzKCkge1xuICAgIGNvbnN0IHdpZHRoID0gKDEwMCAvIHRoaXMuZGVmYXVsdFRpbWUpICogdGhpcy5jdXJyZW50VGltZTtcbiAgICB0aGlzLmluZGljYXRvck5vZGVzLmZvckVhY2goKGluZGljYXRvciwgaW5kZXgpID0+IHtcbiAgICAgIGluZGljYXRvclxuICAgICAgICAuZ2V0Tm9kZSgpXG4gICAgICAgIC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wcm9ncmVzcy13aWR0aCcsIGAke2luZGV4ID09PSB0aGlzLmN1cnJlbnRTbGlkZSA/IHdpZHRoIDogMH0lYCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuLi9jbGFzc2VzL05vZGVDcmVhdGUnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcbmltcG9ydCBQcm9ncmVzc0JhclZpZXcgZnJvbSAnLi9Qcm9ncmVzc0JhclZpZXcnO1xuaW1wb3J0IHNsaWRlckRhdGEgZnJvbSAnLi9zbGlkZXItZGF0YSc7XG5cbmNvbnN0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZvdXJpdGUtY29mZmVlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlclZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgc2xpZGVyRnJhbWU7XG5cbiAgY3VycmVudFNsaWRlSWQgPSAwO1xuXG4gIGlzQWxsb3dlZFRvTW92ZSA9IHRydWU7XG5cbiAgcHJvZ3Jlc3NCYXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydzbGlkZXInXSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgcGFyZW50LmFwcGVuZCh0aGlzLnZpZXdOb2RlLmdldE5vZGUoKSk7XG4gICAgdGhpcy5jb25maWd1cmVWaWV3KCk7XG4gICAgdGhpcy5nZW5lcmF0ZVNsaWRlKCk7XG4gIH1cblxuICBjb25maWd1cmVWaWV3KCkge1xuICAgIGNvbnN0IHByZXYgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNzczogWydzbGlkZXItYnV0dG9uX19wcmV2JywgJ3NsaWRlci1idXR0b24nXSxcbiAgICAgIGNhbGxiYWNrOiB0aGlzLm1vdmVTbGlkZVRvUmlnaHQuYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgICBjb25zdCBzbGlkZXJGcmFtZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ3NsaWRlci1mcmFtZSddLFxuICAgIH0pO1xuICAgIHRoaXMuc2xpZGVyRnJhbWUgPSBzbGlkZXJGcmFtZTtcbiAgICBjb25zdCBuZXh0ID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICBjc3M6IFsnc2xpZGVyLWJ1dHRvbl9fbmV4dCcsICdzbGlkZXItYnV0dG9uJ10sXG4gICAgICBjYWxsYmFjazogdGhpcy5tb3ZlU2xpZGVUb0xlZnQuYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgICBwcmV2LmdldE5vZGUoKS5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG4gICAgPHBhdGggZD1cIk02IDEySDE4LjVNMTguNSAxMkwxMi41IDZNMTguNSAxMkwxMi41IDE4XCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgPC9zdmc+YDtcbiAgICBuZXh0LmdldE5vZGUoKS5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG4gICAgPHBhdGggZD1cIk02IDEySDE4LjVNMTguNSAxMkwxMi41IDZNMTguNSAxMkwxMi41IDE4XCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgPC9zdmc+YDtcbiAgICB0aGlzLnByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyVmlldyhzbGlkZXJEYXRhLmxlbmd0aCwgdGhpcy5tb3ZlU2xpZGVUb0xlZnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUocHJldiwgc2xpZGVyRnJhbWUsIHRoaXMucHJvZ3Jlc3NCYXIuZ2V0RWxlbWVudCgpLCBuZXh0KTtcbiAgfVxuXG4gIGdlbmVyYXRlU2xpZGUoKSB7XG4gICAgdGhpcy52YWxpZGF0ZUlkKCk7XG4gICAgY29uc3QgaWQgPSB0aGlzLmN1cnJlbnRTbGlkZUlkO1xuICAgIGNvbnN0IHNsaWRlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2FydGljbGUnLFxuICAgICAgY3NzOiBbJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGUnXSxcbiAgICB9KTtcbiAgICBzbGlkZS5zZXRDYWxsYmFjayh0aGlzLm1ha2VTd2lwZS5iaW5kKHRoaXMpLCAndG91Y2hzdGFydCcpO1xuICAgIHNsaWRlLnNldENhbGxiYWNrKCgpID0+IHRoaXMucHJvZ3Jlc3NCYXIucGF1c2VBdXRvbWF0aWNTY3JvbGwoKSwgJ21vdXNlZW50ZXInKTtcbiAgICBzbGlkZS5zZXRDYWxsYmFjaygoKSA9PiB0aGlzLnByb2dyZXNzQmFyLmNvbnRpbnVlQXV0b21hdGljU2Nyb2xsKCksICdtb3VzZWxlYXZlJyk7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydzbGlkZV9faW1hZ2UnXSxcbiAgICB9KTtcbiAgICBpbWFnZS5nZXROb2RlKCkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtzbGlkZXJEYXRhW2lkXS5pbWFnZX0nKWA7XG4gICAgY29uc3QgdGl0bGUgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnaDMnLFxuICAgICAgY3NzOiBbJ3NsaWRlX190aXRsZSddLFxuICAgICAgdGV4dDogc2xpZGVyRGF0YVtpZF0udGl0bGUsXG4gICAgfSk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnc2xpZGVfX2Rlc2NyaXB0aW9uJ10sXG4gICAgICB0ZXh0OiBzbGlkZXJEYXRhW2lkXS5kZXNjcmlwdGlvbixcbiAgICB9KTtcbiAgICBjb25zdCBwcmljZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdwJyxcbiAgICAgIGNzczogWydzbGlkZV9fcHJpY2UnXSxcbiAgICAgIHRleHQ6IGAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICBjdXJyZW5jeTogJ1VTRCcsXG4gICAgICB9KS5mb3JtYXQoc2xpZGVyRGF0YVtpZF0ucHJpY2UpfWAsXG4gICAgfSk7XG4gICAgc2xpZGUuYWRkSW5uZXJOb2RlKGltYWdlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaWNlKTtcbiAgICB0aGlzLnNsaWRlckZyYW1lLmFkZElubmVyTm9kZShzbGlkZSk7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zd2l0Y2hTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZUlkKTtcbiAgfVxuXG4gIG1vdmVTbGlkZShuZXdTbGlkZUNsYXNzLCBjdXJyZW50U2xpZGVDbGFzcykge1xuICAgIGlmICh0aGlzLmlzQWxsb3dlZFRvTW92ZSkge1xuICAgICAgdGhpcy5pc0FsbG93ZWRUb01vdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVTbGlkZSgpO1xuICAgICAgY29uc3QgW2N1cnJlbnRTbGlkZSwgbmV3U2xpZGVdID0gdGhpcy5zbGlkZXJGcmFtZS5nZXROb2RlKCkuY2hpbGRyZW47XG4gICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LmFkZChjdXJyZW50U2xpZGVDbGFzcyk7XG4gICAgICBuZXdTbGlkZS5jbGFzc0xpc3QuYWRkKG5ld1NsaWRlQ2xhc3MpO1xuICAgICAgY3VycmVudFNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgICBuZXdTbGlkZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICAgIG5ld1NsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlX2Zyb20tcmlnaHQnLCAnc2xpZGVfZnJvbS1sZWZ0Jyk7XG4gICAgICAgIHRoaXMuaXNBbGxvd2VkVG9Nb3ZlID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlSWQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNsaWRlSWQgPCAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZUlkID0gc2xpZGVyRGF0YS5sZW5ndGggLSAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50U2xpZGVJZCA+IHNsaWRlckRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVJZCA9IDA7XG4gICAgfVxuICB9XG5cbiAgbWFrZVN3aXBlKHN0YXJ0RXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNBbGxvd2VkVG9Nb3ZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvZ3Jlc3NCYXIucGF1c2VBdXRvbWF0aWNTY3JvbGwoKTtcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0RXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgY29uc3Qgc3RhcnRYID0gc3RhcnQuY2xpZW50WDtcbiAgICBjb25zdCBzdGFydFkgPSBzdGFydC5jbGllbnRZO1xuICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgY29uc3QgZW5kU3dpcGUgPSAoZW5kRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGVuZCA9IGVuZEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgY29uc3QgZGlzdGFuY2VYID0gZW5kLmNsaWVudFggLSBzdGFydFg7XG4gICAgICBjb25zdCBkaXN0YW5jZVkgPSBlbmQuY2xpZW50WSAtIHN0YXJ0WTtcbiAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0VGltZTtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuY29udGludWVBdXRvbWF0aWNTY3JvbGwoKTtcbiAgICAgIHN0YXJ0LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGVuZFN3aXBlKTtcbiAgICAgIGlmIChlbmRUaW1lID4gNTAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVgpID49IDEwMCAmJiBNYXRoLmFicyhkaXN0YW5jZVkgPD0gMTAwKSkge1xuICAgICAgICBpZiAoZGlzdGFuY2VYID4gMCkge1xuICAgICAgICAgIHRoaXMubW92ZVNsaWRlVG9SaWdodCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW92ZVNsaWRlVG9MZWZ0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHN0YXJ0LnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGVuZFN3aXBlKTtcbiAgfVxuXG4gIG1vdmVTbGlkZVRvUmlnaHQoKSB7XG4gICAgaWYgKHRoaXMuaXNBbGxvd2VkVG9Nb3ZlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZUlkIC09IDE7XG4gICAgICB0aGlzLm1vdmVTbGlkZSgnc2xpZGVfZnJvbS1sZWZ0JywgJ3NsaWRlX3RvLXJpZ2h0Jyk7XG4gICAgfVxuICB9XG5cbiAgbW92ZVNsaWRlVG9MZWZ0KCkge1xuICAgIGlmICh0aGlzLmlzQWxsb3dlZFRvTW92ZSkge1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVJZCArPSAxO1xuICAgICAgdGhpcy5tb3ZlU2xpZGUoJ3NsaWRlX2Zyb20tcmlnaHQnLCAnc2xpZGVfdG8tbGVmdCcpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHNsaWRlckltZzEgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL3NsaWRlci9jb2ZmZWUtc2xpZGVyLTEucG5nJztcbmltcG9ydCBzbGlkZXJJbWcyIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9zbGlkZXIvY29mZmVlLXNsaWRlci0yLnBuZyc7XG5pbXBvcnQgc2xpZGVySW1nMyBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2Uvc2xpZGVyL2NvZmZlZS1zbGlkZXItMy5wbmcnO1xuXG5jb25zdCBzbGlkZXJEYXRhID0gW1xuICB7XG4gICAgdGl0bGU6ICdT4oCZbW9yZXMgRnJhcHB1Y2Npbm8nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoaXMgbmV3IGRyaW5rIHRha2VzIGFuIGVzcHJlc3NvIGFuZCBtaXhlcyBpdCB3aXRoIGJyb3duIHN1Z2FyIGFuZCBjaW5uYW1vbiBiZWZvcmUgYmVpbmcgdG9wcGVkIHdpdGggb2F0IG1pbGsuJyxcbiAgICBwcmljZTogNS41LFxuICAgIGltYWdlOiBzbGlkZXJJbWcxLFxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdDYXJhbWVsIE1hY2NoaWF0bycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRnJhZ3JhbnQgYW5kIHVuaXF1ZSBjbGFzc2ljIGVzcHJlc3NvIHdpdGggcmljaCBjYXJhbWVsLXBlYW51dCBzeXJ1cCwgd2l0aCBjcmVhbSB1bmRlciB3aGlwcGVkIHRoaWNrIGZvYW0uJyxcbiAgICBwcmljZTogNSxcbiAgICBpbWFnZTogc2xpZGVySW1nMixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnSWNlIGNvZmZlZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQSBwb3B1bGFyIHN1bW1lciBkcmluayB0aGF0IHRvbmVzIGFuZCBpbnZpZ29yYXRlcy4gUHJlcGFyZWQgZnJvbSBjb2ZmZWUsIG1pbGsgYW5kIGljZS4nLFxuICAgIHByaWNlOiA0LjUsXG4gICAgaW1hZ2U6IHNsaWRlckltZzMsXG4gIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJEYXRhO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL2hvbWUuc2Nzcyc7XG5pbXBvcnQgU2xpZGVyVmlldyBmcm9tICcuLi9qcy9zbGlkZXIvU2xpZGVyJztcbmltcG9ydCBCdXJnZXJWaWV3IGZyb20gJy4uL2pzL2J1cmdlci9CdXJnZXInO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHNsaWRlciA9IG5ldyBTbGlkZXJWaWV3KCk7XG5jb25zdCBidXJnZXIgPSBuZXcgQnVyZ2VyVmlldyh0cnVlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==