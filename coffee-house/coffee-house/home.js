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
/* harmony import */ var _slider_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider-data */ "./src/js/slider/slider-data.js");




const parent = document.querySelector('.favourite-coffee');

class SliderView extends _classes_View__WEBPACK_IMPORTED_MODULE_1__["default"] {
  sliderFrame;

  currentSlideId = 0;

  isAllowedToMove = true;

  progressBarButtons = [];

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
      callback: () => {
        this.currentSlideId -= 1;
        this.moveSlide('slide_from-left', 'slide_to-right');
      },
    });
    const sliderFrame = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['slider-frame'],
    });
    this.sliderFrame = sliderFrame;
    const next = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'button',
      css: ['slider-button__next', 'slider-button'],
      callback: () => {
        this.currentSlideId += 1;
        this.moveSlide('slide_from-right', 'slide_to-left');
      },
    });
    prev.getNode().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    next.getNode().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    const bar = this.generateProgressBar();
    this.viewNode.addInnerNode(prev, sliderFrame, bar, next);
  }

  generateSlide() {
    this.validateId();
    const id = this.currentSlideId;
    this.manageProgressButtons();
    const slide = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'article',
      css: ['slider__slide', 'slide'],
    });
    const image = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['slide__image'],
    });
    image.getNode().style.backgroundImage = `url('${_slider_data__WEBPACK_IMPORTED_MODULE_2__["default"][id].image}')`;
    const title = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'h3',
      css: ['slide__title'],
      text: _slider_data__WEBPACK_IMPORTED_MODULE_2__["default"][id].title,
    });
    const description = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['slide__description'],
      text: _slider_data__WEBPACK_IMPORTED_MODULE_2__["default"][id].description,
    });
    const price = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['slide__price'],
      text: `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(_slider_data__WEBPACK_IMPORTED_MODULE_2__["default"][id].price)}`,
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
      this.currentSlideId = _slider_data__WEBPACK_IMPORTED_MODULE_2__["default"].length - 1;
    }
    if (this.currentSlideId > _slider_data__WEBPACK_IMPORTED_MODULE_2__["default"].length - 1) {
      this.currentSlideId = 0;
    }
  }

  generateProgressBar() {
    const bar = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['slider__progress-bar', 'progress-bar'],
    });
    this.progressBarButtons = new Array(_slider_data__WEBPACK_IMPORTED_MODULE_2__["default"].length).fill(0).map(
      () =>
        new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
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

console.log('Выполнены все пункты задания (даже больше, чем нужно :D)');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDZnFCO0FBQ3dCO0FBQ0E7O0FBRTdDO0FBQ0EsbUJBQW1CLHlEQUFVO0FBQzdCLG1CQUFtQix5REFBVTs7QUFFN0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9ob21lL2hvbWUuc2Nzcz82YTQ2Iiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL2J1cmdlci9CdXJnZXIuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvY2xhc3Nlcy9Ob2RlQ3JlYXRlLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL2NsYXNzZXMvVmlldy5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9zbGlkZXIvU2xpZGVyLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL3NsaWRlci9zbGlkZXItZGF0YS5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvaG9tZS9ob21lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBWaWV3IGZyb20gJy4uL2NsYXNzZXMvVmlldyc7XG5pbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi4vY2xhc3Nlcy9Ob2RlQ3JlYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVyZ2VyVmlldyBleHRlbmRzIFZpZXcge1xuICBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnVyZ2VyJyk7XG5cbiAgaXNPcGVuZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihpc0hvbWUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ2J1cmdlci1tZW51J10sXG4gICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5tYW5hZ2VNZW51KCksXG4gICAgfTtcbiAgICBzdXBlcihwYXJhbXMpO1xuICAgIHRoaXMuZ2VuZXJhdGVNZW51KGlzSG9tZSk7XG4gICAgdGhpcy5idXJnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm1hbmFnZU1lbnUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB7XG4gICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmlubmVyV2lkdGggPiA3NjggJiYgdGhpcy5pc09wZW5lZCkge1xuICAgICAgICB0aGlzLm1hbmFnZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdlbmVyYXRlTWVudShpc0hvbWUpIHtcbiAgICBjb25zdCBzdGFydElkID0gaXNIb21lID8gJycgOiAnLi9ob21lLmh0bWwnO1xuICAgIGNvbnN0IGxpbmtzID0gW1xuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnRmF2b3JpdGUgY29mZmVlJyxcbiAgICAgICAgaHJlZjogYCR7c3RhcnRJZH0jZmF2b3VyaXRlLWNvZmZlZWAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ0Fib3V0JyxcbiAgICAgICAgaHJlZjogYCR7c3RhcnRJZH0jYWJvdXRgLFxuICAgICAgfSksXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJ10sXG4gICAgICAgIHRleHQ6ICdNb2JpbGUgYXBwJyxcbiAgICAgICAgaHJlZjogYCR7c3RhcnRJZH0jbW9iaWxlLWFwcGAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ0NvbnRhY3QgdXMnLFxuICAgICAgICBocmVmOiBgI2Zvb3RlcmAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnLCBgJHtpc0hvbWUgPyAnMScgOiAnbm9uZS1ldmVudHMnfWBdLFxuICAgICAgICB0ZXh0OiAnTWVudScsXG4gICAgICAgIGhyZWY6ICcuL21lbnUuaHRtbCcsXG4gICAgICB9KSxcbiAgICBdO1xuICAgIHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKC4uLmxpbmtzKTtcbiAgfVxuXG4gIG1hbmFnZU1lbnUoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLnZpZXdOb2RlLmdldE5vZGUoKSk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKS5jbGFzc0xpc3QuYWRkKCdidXJnZXItbWVudV9vcGVuJyk7XG4gICAgICB9LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3Tm9kZS5zZXRDbGFzc05hbWVzKFsnYnVyZ2VyLW1lbnUnXSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3Tm9kZS5nZXROb2RlKCkucmVtb3ZlKCk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgICB0aGlzLmlzT3BlbmVkID0gIXRoaXMuaXNPcGVuZWQ7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdibG9ja2VkJyk7XG4gICAgdGhpcy5idXJnZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnYnVyZ2VyX2FjdGl2ZScpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMubm9kZSA9IHRoaXMuY3JlYXRlTm9kZShwYXJhbXMpO1xuICB9XG5cbiAgZ2V0Tm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xuICB9XG5cbiAgY3JlYXRlTm9kZShwYXJhbXMpIHtcbiAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHBhcmFtcy50YWcpO1xuICAgIHRoaXMuc2V0Q2xhc3NOYW1lcyhwYXJhbXMuY3NzKTtcbiAgICB0aGlzLnNldFRleHRDb250ZW50KHBhcmFtcy50ZXh0KTtcbiAgICB0aGlzLnNldElkKHBhcmFtcy5pZCk7XG4gICAgaWYgKHBhcmFtcy5jYWxsYmFjaykgdGhpcy5zZXRDYWxsYmFjayhwYXJhbXMuY2FsbGJhY2spO1xuICAgIGlmIChwYXJhbXMuaHJlZikgdGhpcy5zZXRIcmVmKHBhcmFtcy5ocmVmKTtcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xuICB9XG5cbiAgc2V0SHJlZihzdHJpbmcpIHtcbiAgICB0aGlzLm5vZGUuaHJlZiA9IHN0cmluZztcbiAgfVxuXG4gIHNldENsYXNzTmFtZXMoY3NzTGlzdCkge1xuICAgIGlmIChjc3NMaXN0KSB7XG4gICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gJyc7XG4gICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZCguLi5jc3NMaXN0KTtcbiAgICB9XG4gIH1cblxuICBzZXRUZXh0Q29udGVudCh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH1cblxuICBzZXRDYWxsYmFjayhjYWxsYmFjaywgaGFuZGxlciA9ICdjbGljaycpIHtcbiAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihoYW5kbGVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXRJZChpZCkge1xuICAgIGlmIChpZCkgdGhpcy5ub2RlLmlkID0gaWQ7XG4gIH1cblxuICBhZGRJbm5lck5vZGUoLi4ubGlzdCkge1xuICAgIGxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBOb2RlQ3JlYXRvcikge1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kKG5vZGUuZ2V0Tm9kZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmQobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcmVwZW5kSW5uZXJOb2RlKC4uLmxpc3QpIHtcbiAgICBsaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZUNyZWF0b3IpIHtcbiAgICAgICAgdGhpcy5ub2RlLnByZXBlbmQobm9kZS5nZXROb2RlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub2RlLnByZXBlbmQobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVBbGxDaGlsZHJlbigpIHtcbiAgICB3aGlsZSAodGhpcy5ub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTm9kZSgpIHtcbiAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuL05vZGVDcmVhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgbW9kYWwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMudmlld05vZGUgPSBuZXcgTm9kZUNyZWF0b3IocGFyYW1zKTtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpO1xuICB9XG5cbiAgYWRkVmlld0luc2lkZSguLi52aWV3KSB7XG4gICAgdmlldy5mb3JFYWNoKChpbnN0KSA9PiB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZShpbnN0LmdldEVsZW1lbnQoKSkpO1xuICB9XG5cbiAgc2hvd01vZGFsKCkge1xuICAgIGNvbnN0IG1vZGFsID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnbW9kYWwnXSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmNsb3NlTW9kYWwoKSxcbiAgICB9KTtcbiAgICBtb2RhbC5hZGRJbm5lck5vZGUodGhpcy52aWV3Tm9kZSk7XG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMubW9kYWwuZ2V0Tm9kZSgpKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2Jsb2NrZWQnKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgIHRoaXMubW9kYWwuZ2V0Tm9kZSgpLnJlbW92ZSgpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdibG9ja2VkJyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi4vY2xhc3Nlcy9Ob2RlQ3JlYXRlJztcbmltcG9ydCBWaWV3IGZyb20gJy4uL2NsYXNzZXMvVmlldyc7XG5pbXBvcnQgc2xpZGVyRGF0YSBmcm9tICcuL3NsaWRlci1kYXRhJztcblxuY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdm91cml0ZS1jb2ZmZWUnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyVmlldyBleHRlbmRzIFZpZXcge1xuICBzbGlkZXJGcmFtZTtcblxuICBjdXJyZW50U2xpZGVJZCA9IDA7XG5cbiAgaXNBbGxvd2VkVG9Nb3ZlID0gdHJ1ZTtcblxuICBwcm9ncmVzc0JhckJ1dHRvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ3NsaWRlciddLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICBwYXJlbnQuYXBwZW5kKHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpKTtcbiAgICB0aGlzLmNvbmZpZ3VyZVZpZXcoKTtcbiAgICB0aGlzLmdlbmVyYXRlU2xpZGUoKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVZpZXcoKSB7XG4gICAgY29uc3QgcHJldiA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgY3NzOiBbJ3NsaWRlci1idXR0b25fX3ByZXYnLCAnc2xpZGVyLWJ1dHRvbiddLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVJZCAtPSAxO1xuICAgICAgICB0aGlzLm1vdmVTbGlkZSgnc2xpZGVfZnJvbS1sZWZ0JywgJ3NsaWRlX3RvLXJpZ2h0Jyk7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIGNvbnN0IHNsaWRlckZyYW1lID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnc2xpZGVyLWZyYW1lJ10sXG4gICAgfSk7XG4gICAgdGhpcy5zbGlkZXJGcmFtZSA9IHNsaWRlckZyYW1lO1xuICAgIGNvbnN0IG5leHQgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNzczogWydzbGlkZXItYnV0dG9uX19uZXh0JywgJ3NsaWRlci1idXR0b24nXSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlSWQgKz0gMTtcbiAgICAgICAgdGhpcy5tb3ZlU2xpZGUoJ3NsaWRlX2Zyb20tcmlnaHQnLCAnc2xpZGVfdG8tbGVmdCcpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICBwcmV2LmdldE5vZGUoKS5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG4gICAgPHBhdGggZD1cIk02IDEySDE4LjVNMTguNSAxMkwxMi41IDZNMTguNSAxMkwxMi41IDE4XCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgPC9zdmc+YDtcbiAgICBuZXh0LmdldE5vZGUoKS5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG4gICAgPHBhdGggZD1cIk02IDEySDE4LjVNMTguNSAxMkwxMi41IDZNMTguNSAxMkwxMi41IDE4XCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgPC9zdmc+YDtcbiAgICBjb25zdCBiYXIgPSB0aGlzLmdlbmVyYXRlUHJvZ3Jlc3NCYXIoKTtcbiAgICB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZShwcmV2LCBzbGlkZXJGcmFtZSwgYmFyLCBuZXh0KTtcbiAgfVxuXG4gIGdlbmVyYXRlU2xpZGUoKSB7XG4gICAgdGhpcy52YWxpZGF0ZUlkKCk7XG4gICAgY29uc3QgaWQgPSB0aGlzLmN1cnJlbnRTbGlkZUlkO1xuICAgIHRoaXMubWFuYWdlUHJvZ3Jlc3NCdXR0b25zKCk7XG4gICAgY29uc3Qgc2xpZGUgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnYXJ0aWNsZScsXG4gICAgICBjc3M6IFsnc2xpZGVyX19zbGlkZScsICdzbGlkZSddLFxuICAgIH0pO1xuICAgIGNvbnN0IGltYWdlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnc2xpZGVfX2ltYWdlJ10sXG4gICAgfSk7XG4gICAgaW1hZ2UuZ2V0Tm9kZSgpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7c2xpZGVyRGF0YVtpZF0uaW1hZ2V9JylgO1xuICAgIGNvbnN0IHRpdGxlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2gzJyxcbiAgICAgIGNzczogWydzbGlkZV9fdGl0bGUnXSxcbiAgICAgIHRleHQ6IHNsaWRlckRhdGFbaWRdLnRpdGxlLFxuICAgIH0pO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ3AnLFxuICAgICAgY3NzOiBbJ3NsaWRlX19kZXNjcmlwdGlvbiddLFxuICAgICAgdGV4dDogc2xpZGVyRGF0YVtpZF0uZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gICAgY29uc3QgcHJpY2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnc2xpZGVfX3ByaWNlJ10sXG4gICAgICB0ZXh0OiBgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgICAgfSkuZm9ybWF0KHNsaWRlckRhdGFbaWRdLnByaWNlKX1gLFxuICAgIH0pO1xuICAgIHNsaWRlLmFkZElubmVyTm9kZShpbWFnZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBwcmljZSk7XG4gICAgdGhpcy5zbGlkZXJGcmFtZS5hZGRJbm5lck5vZGUoc2xpZGUpO1xuICB9XG5cbiAgbW92ZVNsaWRlKG5ld1NsaWRlQ2xhc3MsIGN1cnJlbnRTbGlkZUNsYXNzKSB7XG4gICAgaWYgKHRoaXMuaXNBbGxvd2VkVG9Nb3ZlKSB7XG4gICAgICB0aGlzLmlzQWxsb3dlZFRvTW92ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5nZW5lcmF0ZVNsaWRlKCk7XG4gICAgICBjb25zdCBbY3VycmVudFNsaWRlLCBuZXdTbGlkZV0gPSB0aGlzLnNsaWRlckZyYW1lLmdldE5vZGUoKS5jaGlsZHJlbjtcbiAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QuYWRkKGN1cnJlbnRTbGlkZUNsYXNzKTtcbiAgICAgIG5ld1NsaWRlLmNsYXNzTGlzdC5hZGQobmV3U2xpZGVDbGFzcyk7XG4gICAgICBjdXJyZW50U2xpZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIG5ld1NsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgbmV3U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVfZnJvbS1yaWdodCcsICdzbGlkZV9mcm9tLWxlZnQnKTtcbiAgICAgICAgdGhpcy5pc0FsbG93ZWRUb01vdmUgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVJZCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2xpZGVJZCA8IDApIHtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlSWQgPSBzbGlkZXJEYXRhLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1cnJlbnRTbGlkZUlkID4gc2xpZGVyRGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZUlkID0gMDtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVByb2dyZXNzQmFyKCkge1xuICAgIGNvbnN0IGJhciA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ3NsaWRlcl9fcHJvZ3Jlc3MtYmFyJywgJ3Byb2dyZXNzLWJhciddLFxuICAgIH0pO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJCdXR0b25zID0gbmV3IEFycmF5KHNsaWRlckRhdGEubGVuZ3RoKS5maWxsKDApLm1hcChcbiAgICAgICgpID0+XG4gICAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICBjc3M6IFsncHJvZ3Jlc3MtYmFyX19idXR0b24nXSxcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGJhci5hZGRJbm5lck5vZGUoLi4udGhpcy5wcm9ncmVzc0JhckJ1dHRvbnMpO1xuICAgIHJldHVybiBiYXI7XG4gIH1cblxuICBtYW5hZ2VQcm9ncmVzc0J1dHRvbnMoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhckJ1dHRvbnMuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBidG4uZ2V0Tm9kZSgpLmRpc2FibGVkID0gdGhpcy5jdXJyZW50U2xpZGVJZCA9PT0gaW5kZXg7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBzbGlkZXJJbWcxIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9zbGlkZXIvY29mZmVlLXNsaWRlci0xLnBuZyc7XG5pbXBvcnQgc2xpZGVySW1nMiBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2Uvc2xpZGVyL2NvZmZlZS1zbGlkZXItMi5wbmcnO1xuaW1wb3J0IHNsaWRlckltZzMgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL3NsaWRlci9jb2ZmZWUtc2xpZGVyLTMucG5nJztcblxuY29uc3Qgc2xpZGVyRGF0YSA9IFtcbiAge1xuICAgIHRpdGxlOiAnU+KAmW1vcmVzIEZyYXBwdWNjaW5vJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGlzIG5ldyBkcmluayB0YWtlcyBhbiBlc3ByZXNzbyBhbmQgbWl4ZXMgaXQgd2l0aCBicm93biBzdWdhciBhbmQgY2lubmFtb24gYmVmb3JlIGJlaW5nIHRvcHBlZCB3aXRoIG9hdCBtaWxrLicsXG4gICAgcHJpY2U6IDUuNSxcbiAgICBpbWFnZTogc2xpZGVySW1nMSxcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnQ2FyYW1lbCBNYWNjaGlhdG8nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0ZyYWdyYW50IGFuZCB1bmlxdWUgY2xhc3NpYyBlc3ByZXNzbyB3aXRoIHJpY2ggY2FyYW1lbC1wZWFudXQgc3lydXAsIHdpdGggY3JlYW0gdW5kZXIgd2hpcHBlZCB0aGljayBmb2FtLicsXG4gICAgcHJpY2U6IDUsXG4gICAgaW1hZ2U6IHNsaWRlckltZzIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0ljZSBjb2ZmZWUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0EgcG9wdWxhciBzdW1tZXIgZHJpbmsgdGhhdCB0b25lcyBhbmQgaW52aWdvcmF0ZXMuIFByZXBhcmVkIGZyb20gY29mZmVlLCBtaWxrIGFuZCBpY2UuJyxcbiAgICBwcmljZTogNC41LFxuICAgIGltYWdlOiBzbGlkZXJJbWczLFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVyRGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9ob21lLnNjc3MnO1xuaW1wb3J0IFNsaWRlclZpZXcgZnJvbSAnLi4vanMvc2xpZGVyL1NsaWRlcic7XG5pbXBvcnQgQnVyZ2VyVmlldyBmcm9tICcuLi9qcy9idXJnZXIvQnVyZ2VyJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyVmlldygpO1xuY29uc3QgYnVyZ2VyID0gbmV3IEJ1cmdlclZpZXcodHJ1ZSk7XG5cbmNvbnNvbGUubG9nKCfQktGL0L/QvtC70L3QtdC90Ysg0LLRgdC1INC/0YPQvdC60YLRiyDQt9Cw0LTQsNC90LjRjyAo0LTQsNC20LUg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3Rg9C20L3QviA6RCknKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==