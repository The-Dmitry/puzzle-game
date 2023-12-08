/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/menu/menu.scss":
/*!****************************!*\
  !*** ./src/menu/menu.scss ***!
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

/***/ "./src/js/menu/CardView.js":
/*!*********************************!*\
  !*** ./src/js/menu/CardView.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CardView)
/* harmony export */ });
/* harmony import */ var _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/NodeCreate */ "./src/js/classes/NodeCreate.js");
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");
/* harmony import */ var _ModalCardView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ModalCardView */ "./src/js/menu/ModalCardView.js");




class CardView extends _classes_View__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(cardParams) {
    const params = {
      tag: 'article',
      css: ['menu-content__card', 'card'],
      callback: () => new _ModalCardView__WEBPACK_IMPORTED_MODULE_2__["default"](cardParams),
    };
    super(params);
    this.configureView(cardParams);
  }

  configureView(cardParams) {
    const image = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['card-image'],
    });
    image.getNode().style.backgroundImage = `url('${cardParams.image}')`;
    const content = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['card-text'],
    });
    const title = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'h4',
      css: ['card-title'],
      text: cardParams.name,
    });
    const description = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['card-description'],
      text: cardParams.description,
    });
    const price = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['card-price'],
      text: `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(cardParams.price)}`,
    });
    content.addInnerNode(title, description, price);
    this.viewNode.addInnerNode(image, content);
  }
}


/***/ }),

/***/ "./src/js/menu/CategoriesContentView.js":
/*!**********************************************!*\
  !*** ./src/js/menu/CategoriesContentView.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoriesContentView)
/* harmony export */ });
/* harmony import */ var _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/NodeCreate */ "./src/js/classes/NodeCreate.js");
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");
/* harmony import */ var _CardView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CardView */ "./src/js/menu/CardView.js");
/* harmony import */ var _menu_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-data */ "./src/js/menu/menu-data.js");
/* harmony import */ var _refreshSvg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./refreshSvg */ "./src/js/menu/refreshSvg.js");






class CategoriesContentView extends _classes_View__WEBPACK_IMPORTED_MODULE_1__["default"] {
  data = _menu_data__WEBPACK_IMPORTED_MODULE_3__["default"];

  currentFilter = 'coffee';

  variant = 'mobile';

  createdVariant;

  constructor() {
    const params = {
      tag: 'div',
      css: ['menu-content'],
    };
    super(params);
    this.createCards();
    window.addEventListener('resize', () => this.createCards());
  }

  createCards(category = this.currentFilter) {
    if (this.checkWidth() && category === this.currentFilter) {
      return;
    }
    this.createdVariant = this.variant;
    this.currentFilter = category;
    const arr = this.data
      .filter((item) => item.category === category)
      .map((el) => new _CardView__WEBPACK_IMPORTED_MODULE_2__["default"](el));
    if (this.createdVariant === 'desktop') {
      this.setCards(arr);
      return;
    }
    const showAll = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'button',
      css: ['menu__show-all'],
      callback: () => this.setCards(arr),
    });
    showAll.getNode().innerHTML = _refreshSvg__WEBPACK_IMPORTED_MODULE_4__["default"];
    this.setCards(arr.slice(0, 4), arr.length > 4 ? showAll : null);
  }

  setCards(nodes, btn) {
    this.viewNode.removeAllChildren();
    this.addViewInside(...nodes);
    if (btn) {
      this.viewNode.addInnerNode(btn);
    }
  }

  checkWidth() {
    const width = document.body.clientWidth;
    this.variant = width > 1000 ? 'desktop' : 'mobile';
    return this.variant === this.createdVariant;
  }
}


/***/ }),

/***/ "./src/js/menu/CategoriesNavigationView.js":
/*!*************************************************!*\
  !*** ./src/js/menu/CategoriesNavigationView.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoriesNavigationView)
/* harmony export */ });
/* harmony import */ var _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/NodeCreate */ "./src/js/classes/NodeCreate.js");
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");



const categories = ['coffee', 'tea', 'dessert'];

class CategoriesNavigationView extends _classes_View__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(func) {
    const params = {
      tag: 'div',
      css: ['menu-navigation'],
    };
    super(params);
    this.configureView(func);
  }

  configureView(func) {
    const btns = [...categories].map((item) => {
      const button = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
        tag: 'button',
        text: item,
        css: ['menu-navigation__button'],
        callback: () => {
          func(item);
          btns.forEach((btn) => btn.setClassNames(['menu-navigation__button']));
          button.setClassNames(['menu-navigation__button', 'menu-navigation__button_selected']);
        },
      });
      return button;
    });
    btns[0].setClassNames(['menu-navigation__button', 'menu-navigation__button_selected']);
    this.viewNode.addInnerNode(...btns);
  }
}


/***/ }),

/***/ "./src/js/menu/CategoriesView.js":
/*!***************************************!*\
  !*** ./src/js/menu/CategoriesView.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoriesView)
/* harmony export */ });
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");
/* harmony import */ var _CategoriesContentView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoriesContentView */ "./src/js/menu/CategoriesContentView.js");
/* harmony import */ var _CategoriesNavigationView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CategoriesNavigationView */ "./src/js/menu/CategoriesNavigationView.js");




const container = document.querySelector('.menu');

class CategoriesView extends _classes_View__WEBPACK_IMPORTED_MODULE_0__["default"] {
  navigation;

  content;

  constructor() {
    const params = {
      tag: 'div',
      css: ['menu__container'],
    };
    super(params);
    container.append(this.viewNode.getNode());
    this.configureView();
  }

  configureView() {
    this.navigation = new _CategoriesNavigationView__WEBPACK_IMPORTED_MODULE_2__["default"](this.switchCategory.bind(this));
    this.content = new _CategoriesContentView__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.addViewInside(this.navigation, this.content);
  }

  switchCategory(category) {
    this.content.createCards(category);
  }
}


/***/ }),

/***/ "./src/js/menu/ModalCardView.js":
/*!**************************************!*\
  !*** ./src/js/menu/ModalCardView.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalCardView)
/* harmony export */ });
/* harmony import */ var _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/NodeCreate */ "./src/js/classes/NodeCreate.js");
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/View */ "./src/js/classes/View.js");



const warningText =
  'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';

class ModalCardView extends _classes_View__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
    const image = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['modal-card__image'],
    });
    const imageContainer = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
    const details = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['modal-card__details'],
    });
    const title = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'h4',
      css: ['modal-card__title'],
      text: cardParams.name,
    });
    const description = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'h4',
      css: ['modal-card__description'],
      text: cardParams.description,
    });
    const sizeSelector = this.createSizeSelector(cardParams);
    const additivesSelector = this.createAdditivesSelector(cardParams);
    const totalPrice = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['modal-card__price'],
    });
    this.totalNode = totalPrice;
    const warning = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['modal-card__warning'],
      text: warningText,
    });
    const close = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
    const sizeContainer = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['modal-card__size-selector'],
    });
    const sizeSubtitle = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['modal-card__subtitle'],
      text: 'Size',
    });
    const btnContainer = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['modal-card__button-container', 'size__button-container'],
    });
    const btns = Object.values(cardParams.sizes).map((info) => {
      const button = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
    const additivesContainer = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['modal-card__additives-selector'],
    });
    const sizeSubtitle = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'p',
      css: ['modal-card__subtitle'],
      text: 'Additives',
    });
    const btnContainer = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
      tag: 'div',
      css: ['modal-card__button-container', 'additive__button-container'],
    });
    const btns = [...cardParams.additives].map((info, index) => {
      const button = new _classes_NodeCreate__WEBPACK_IMPORTED_MODULE_0__["default"]({
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


/***/ }),

/***/ "./src/js/menu/menu-data.js":
/*!**********************************!*\
  !*** ./src/js/menu/menu-data.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_image_menu_coffee_coffee_1_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-1.jpg */ "./src/assets/image/menu/coffee/coffee-1.jpg");
/* harmony import */ var _assets_image_menu_coffee_coffee_2_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-2.jpg */ "./src/assets/image/menu/coffee/coffee-2.jpg");
/* harmony import */ var _assets_image_menu_coffee_coffee_3_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-3.jpg */ "./src/assets/image/menu/coffee/coffee-3.jpg");
/* harmony import */ var _assets_image_menu_coffee_coffee_4_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-4.jpg */ "./src/assets/image/menu/coffee/coffee-4.jpg");
/* harmony import */ var _assets_image_menu_coffee_coffee_5_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-5.jpg */ "./src/assets/image/menu/coffee/coffee-5.jpg");
/* harmony import */ var _assets_image_menu_coffee_coffee_6_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-6.jpg */ "./src/assets/image/menu/coffee/coffee-6.jpg");
/* harmony import */ var _assets_image_menu_coffee_coffee_7_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-7.jpg */ "./src/assets/image/menu/coffee/coffee-7.jpg");
/* harmony import */ var _assets_image_menu_coffee_coffee_8_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/image/menu/coffee/coffee-8.jpg */ "./src/assets/image/menu/coffee/coffee-8.jpg");
/* harmony import */ var _assets_image_menu_tea_tea_1_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../assets/image/menu/tea/tea-1.png */ "./src/assets/image/menu/tea/tea-1.png");
/* harmony import */ var _assets_image_menu_tea_tea_2_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../assets/image/menu/tea/tea-2.png */ "./src/assets/image/menu/tea/tea-2.png");
/* harmony import */ var _assets_image_menu_tea_tea_3_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../assets/image/menu/tea/tea-3.png */ "./src/assets/image/menu/tea/tea-3.png");
/* harmony import */ var _assets_image_menu_tea_tea_4_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../assets/image/menu/tea/tea-4.png */ "./src/assets/image/menu/tea/tea-4.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_1_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-1.png */ "./src/assets/image/menu/dessert/dessert-1.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_2_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-2.png */ "./src/assets/image/menu/dessert/dessert-2.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_3_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-3.png */ "./src/assets/image/menu/dessert/dessert-3.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_4_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-4.png */ "./src/assets/image/menu/dessert/dessert-4.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_5_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-5.png */ "./src/assets/image/menu/dessert/dessert-5.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_6_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-6.png */ "./src/assets/image/menu/dessert/dessert-6.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_7_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-7.png */ "./src/assets/image/menu/dessert/dessert-7.png");
/* harmony import */ var _assets_image_menu_dessert_dessert_8_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../assets/image/menu/dessert/dessert-8.png */ "./src/assets/image/menu/dessert/dessert-8.png");























const menuData = [
  {
    name: 'Irish coffee',
    description: 'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
    price: '7.00',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_1_jpg__WEBPACK_IMPORTED_MODULE_0__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Kahlua coffee',
    description: 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
    price: '7.00',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_2_jpg__WEBPACK_IMPORTED_MODULE_1__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Honey raf',
    description: 'Espresso with frothed milk, cream and aromatic honey',
    price: '5.50',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_3_jpg__WEBPACK_IMPORTED_MODULE_2__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Ice cappuccino',
    description: 'Cappuccino with soft thick foam in summer version with ice',
    price: '5.00',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_4_jpg__WEBPACK_IMPORTED_MODULE_3__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Espresso',
    description: 'Classic black coffee',
    price: '4.50',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_5_jpg__WEBPACK_IMPORTED_MODULE_4__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Latte',
    description: 'Espresso coffee with the addition of steamed milk and dense milk foam',
    price: '5.50',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_6_jpg__WEBPACK_IMPORTED_MODULE_5__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Latte macchiato',
    description: 'Espresso with frothed milk and chocolate',
    price: '5.50',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_7_jpg__WEBPACK_IMPORTED_MODULE_6__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Coffee with cognac',
    description: 'Fragrant black coffee with cognac and whipped cream',
    price: '6.50',
    category: 'coffee',
    image: _assets_image_menu_coffee_coffee_8_jpg__WEBPACK_IMPORTED_MODULE_7__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Cinnamon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Moroccan',
    description:
      'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
    price: '4.50',
    category: 'tea',
    image: _assets_image_menu_tea_tea_1_png__WEBPACK_IMPORTED_MODULE_8__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Lemon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Ginger',
    description: 'Original black tea with fresh ginger, lemon and honey',
    price: '5.00',
    category: 'tea',
    image: _assets_image_menu_tea_tea_2_png__WEBPACK_IMPORTED_MODULE_9__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Lemon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Cranberry',
    description: 'Invigorating black tea with cranberry and honey',
    price: '5.00',
    category: 'tea',
    image: _assets_image_menu_tea_tea_3_png__WEBPACK_IMPORTED_MODULE_10__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Lemon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Sea buckthorn',
    description: 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
    price: '5.50',
    category: 'tea',
    image: _assets_image_menu_tea_tea_4_png__WEBPACK_IMPORTED_MODULE_11__,
    sizes: {
      s: {
        size: '200 ml',
        'add-price': '0.00',
      },
      m: {
        size: '300 ml',
        'add-price': '0.50',
      },
      l: {
        size: '400 ml',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Sugar',
        'add-price': '0.50',
      },
      {
        name: 'Lemon',
        'add-price': '0.50',
      },
      {
        name: 'Syrup',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Marble cheesecake',
    description: 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
    price: '3.50',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_1_png__WEBPACK_IMPORTED_MODULE_12__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Red velvet',
    description: 'Layer cake with cream cheese frosting',
    price: '4.00',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_2_png__WEBPACK_IMPORTED_MODULE_13__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Cheesecakes',
    description:
      'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
    price: '4.50',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_3_png__WEBPACK_IMPORTED_MODULE_14__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Creme brulee',
    description: 'Delicate creamy dessert in a caramel basket with wild berries',
    price: '4.00',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_4_png__WEBPACK_IMPORTED_MODULE_15__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Pancakes',
    description: 'Tender pancakes with strawberry jam and fresh strawberries',
    price: '4.50',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_5_png__WEBPACK_IMPORTED_MODULE_16__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Honey cake',
    description: 'Classic honey cake with delicate custard',
    price: '4.50',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_6_png__WEBPACK_IMPORTED_MODULE_17__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Chocolate cake',
    description: 'Cake with hot chocolate filling and nuts with dried apricots',
    price: '5.50',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_7_png__WEBPACK_IMPORTED_MODULE_18__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },

  {
    name: 'Black forest',
    description: 'A combination of thin sponge cake with cherry jam and light chocolate mousse',
    price: '6.50',
    category: 'dessert',
    image: _assets_image_menu_dessert_dessert_8_png__WEBPACK_IMPORTED_MODULE_19__,
    sizes: {
      s: {
        size: '50 g',
        'add-price': '0.00',
      },
      m: {
        size: '100 g',
        'add-price': '0.50',
      },
      l: {
        size: '200 g',
        'add-price': '1.00',
      },
    },
    additives: [
      {
        name: 'Berries',
        'add-price': '0.50',
      },
      {
        name: 'Nuts',
        'add-price': '0.50',
      },
      {
        name: 'Jam',
        'add-price': '0.50',
      },
    ],
  },
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuData);


/***/ }),

/***/ "./src/js/menu/refreshSvg.js":
/*!***********************************!*\
  !*** ./src/js/menu/refreshSvg.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const refresh = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (refresh);


/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-1.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-1.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/5d01189bb8dcac0d3266.jpg";

/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-2.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-2.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/48cdca4a5f1be46eb7de.jpg";

/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-3.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-3.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/b2202d3a819b773074c2.jpg";

/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-4.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-4.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/24ab0aa5bf78a90a41d0.jpg";

/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-5.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-5.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/9a0ce0ff7d6e172d502b.jpg";

/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-6.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-6.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/a2eae3ac310f43df33e2.jpg";

/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-7.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-7.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/42b4d51486cfdae0a9b3.jpg";

/***/ }),

/***/ "./src/assets/image/menu/coffee/coffee-8.jpg":
/*!***************************************************!*\
  !*** ./src/assets/image/menu/coffee/coffee-8.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/6ff9cb64abd71cb7c779.jpg";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-1.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-1.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/e28173f0661d791c09f1.png";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-2.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-2.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/37cb4fe3ee93ae65d2b1.png";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-3.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-3.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/332093e97e3809eca8a0.png";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-4.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-4.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/1d44b0cd8a9da991a5a1.png";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-5.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-5.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/27c68d864626920fecb7.png";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-6.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-6.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/ca191af649d002a0edaf.png";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-7.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-7.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/bfbcfa36c3591865d20b.png";

/***/ }),

/***/ "./src/assets/image/menu/dessert/dessert-8.png":
/*!*****************************************************!*\
  !*** ./src/assets/image/menu/dessert/dessert-8.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/b471eca4888e1a082d9e.png";

/***/ }),

/***/ "./src/assets/image/menu/tea/tea-1.png":
/*!*********************************************!*\
  !*** ./src/assets/image/menu/tea/tea-1.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/6a118c5a5b00783f924a.png";

/***/ }),

/***/ "./src/assets/image/menu/tea/tea-2.png":
/*!*********************************************!*\
  !*** ./src/assets/image/menu/tea/tea-2.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/5fc2061ada105032bbe5.png";

/***/ }),

/***/ "./src/assets/image/menu/tea/tea-3.png":
/*!*********************************************!*\
  !*** ./src/assets/image/menu/tea/tea-3.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/a5c36c0fb46ed3542a27.png";

/***/ }),

/***/ "./src/assets/image/menu/tea/tea-4.png":
/*!*********************************************!*\
  !*** ./src/assets/image/menu/tea/tea-4.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/acc73f1f37b907791447.png";

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
  !*** ./src/menu/menu.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.scss */ "./src/menu/menu.scss");
/* harmony import */ var _js_menu_CategoriesView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/menu/CategoriesView */ "./src/js/menu/CategoriesView.js");
/* harmony import */ var _js_burger_Burger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/burger/Burger */ "./src/js/burger/Burger.js");




const app = new _js_menu_CategoriesView__WEBPACK_IMPORTED_MODULE_1__["default"]();
const burger = new _js_burger_Burger__WEBPACK_IMPORTED_MODULE_2__["default"](false);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztBQ3ZLa0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFWTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNkRBQUk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw2REFBSTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDhEQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOERBQUk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzRUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzRUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMzdUJ4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0x2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7QUNmcUI7QUFDa0M7QUFDVjs7QUFFN0MsZ0JBQWdCLCtEQUFjO0FBQzlCLG1CQUFtQix5REFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL21lbnUvbWVudS5zY3NzPzFmZTQiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvYnVyZ2VyL0J1cmdlci5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9jbGFzc2VzL05vZGVDcmVhdGUuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvY2xhc3Nlcy9WaWV3LmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL21lbnUvQ2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9DYXRlZ29yaWVzQ29udGVudFZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9DYXRlZ29yaWVzTmF2aWdhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9DYXRlZ29yaWVzVmlldy5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9tZW51L01vZGFsQ2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9tZW51LWRhdGEuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9yZWZyZXNoU3ZnLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9tZW51L21lbnUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcbmltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuLi9jbGFzc2VzL05vZGVDcmVhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXJnZXJWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGJ1cmdlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXInKTtcblxuICBpc09wZW5lZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGlzSG9tZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnYnVyZ2VyLW1lbnUnXSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLm1hbmFnZU1lbnUoKSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgdGhpcy5nZW5lcmF0ZU1lbnUoaXNIb21lKTtcbiAgICB0aGlzLmJ1cmdlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubWFuYWdlTWVudS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuaW5uZXJXaWR0aCA+IDc2OCAmJiB0aGlzLmlzT3BlbmVkKSB7XG4gICAgICAgIHRoaXMubWFuYWdlTWVudSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2VuZXJhdGVNZW51KGlzSG9tZSkge1xuICAgIGNvbnN0IHN0YXJ0SWQgPSBpc0hvbWUgPyAnJyA6ICcuL2hvbWUuaHRtbCc7XG4gICAgY29uc3QgbGlua3MgPSBbXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJ10sXG4gICAgICAgIHRleHQ6ICdGYXZvcml0ZSBjb2ZmZWUnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNmYXZvdXJpdGUtY29mZmVlYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnQWJvdXQnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNhYm91dGAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ01vYmlsZSBhcHAnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNtb2JpbGUtYXBwYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnQ29udGFjdCB1cycsXG4gICAgICAgIGhyZWY6IGAjZm9vdGVyYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluaycsIGAke2lzSG9tZSA/ICcxJyA6ICdub25lLWV2ZW50cyd9YF0sXG4gICAgICAgIHRleHQ6ICdNZW51JyxcbiAgICAgICAgaHJlZjogJy4vbWVudS5odG1sJyxcbiAgICAgIH0pLFxuICAgIF07XG4gICAgdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoLi4ubGlua3MpO1xuICB9XG5cbiAgbWFuYWdlTWVudSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpLmNsYXNzTGlzdC5hZGQoJ2J1cmdlci1tZW51X29wZW4nKTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdOb2RlLnNldENsYXNzTmFtZXMoWydidXJnZXItbWVudSddKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKS5yZW1vdmUoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2Jsb2NrZWQnKTtcbiAgICB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdidXJnZXJfYWN0aXZlJyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGVDcmVhdG9yIHtcbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5ub2RlID0gdGhpcy5jcmVhdGVOb2RlKHBhcmFtcyk7XG4gIH1cblxuICBnZXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGU7XG4gIH1cblxuICBjcmVhdGVOb2RlKHBhcmFtcykge1xuICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocGFyYW1zLnRhZyk7XG4gICAgdGhpcy5zZXRDbGFzc05hbWVzKHBhcmFtcy5jc3MpO1xuICAgIHRoaXMuc2V0VGV4dENvbnRlbnQocGFyYW1zLnRleHQpO1xuICAgIHRoaXMuc2V0SWQocGFyYW1zLmlkKTtcbiAgICBpZiAocGFyYW1zLmNhbGxiYWNrKSB0aGlzLnNldENhbGxiYWNrKHBhcmFtcy5jYWxsYmFjayk7XG4gICAgaWYgKHBhcmFtcy5ocmVmKSB0aGlzLnNldEhyZWYocGFyYW1zLmhyZWYpO1xuICAgIHJldHVybiB0aGlzLm5vZGU7XG4gIH1cblxuICBzZXRIcmVmKHN0cmluZykge1xuICAgIHRoaXMubm9kZS5ocmVmID0gc3RyaW5nO1xuICB9XG5cbiAgc2V0Q2xhc3NOYW1lcyhjc3NMaXN0KSB7XG4gICAgaWYgKGNzc0xpc3QpIHtcbiAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAnJztcbiAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKC4uLmNzc0xpc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRleHRDb250ZW50KHRleHQpIHtcbiAgICBpZiAodGV4dCkgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfVxuXG4gIHNldENhbGxiYWNrKGNhbGxiYWNrLCBoYW5kbGVyID0gJ2NsaWNrJykge1xuICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKGhhbmRsZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNldElkKGlkKSB7XG4gICAgaWYgKGlkKSB0aGlzLm5vZGUuaWQgPSBpZDtcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgYWRkSW5uZXJOb2RlKC4uLmxpc3QpIHtcbiAgICBsaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZUNyZWF0b3IpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZChub2RlLmdldE5vZGUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJlcGVuZElubmVyTm9kZSguLi5saXN0KSB7XG4gICAgbGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGVDcmVhdG9yKSB7XG4gICAgICAgIHRoaXMubm9kZS5wcmVwZW5kKG5vZGUuZ2V0Tm9kZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm9kZS5wcmVwZW5kKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQWxsQ2hpbGRyZW4oKSB7XG4gICAgd2hpbGUgKHRoaXMubm9kZS5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU5vZGUoKSB7XG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi9Ob2RlQ3JlYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIG1vZGFsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLnZpZXdOb2RlID0gbmV3IE5vZGVDcmVhdG9yKHBhcmFtcyk7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKTtcbiAgfVxuXG4gIGFkZFZpZXdJbnNpZGUoLi4udmlldykge1xuICAgIHZpZXcuZm9yRWFjaCgoaW5zdCkgPT4gdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoaW5zdC5nZXRFbGVtZW50KCkpKTtcbiAgfVxuXG4gIHNob3dNb2RhbCgpIHtcbiAgICBjb25zdCBtb2RhbCA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsJ10sXG4gICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5jbG9zZU1vZGFsKCksXG4gICAgfSk7XG4gICAgbW9kYWwuYWRkSW5uZXJOb2RlKHRoaXMudmlld05vZGUpO1xuICAgIHRoaXMubW9kYWwgPSBtb2RhbDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLm1vZGFsLmdldE5vZGUoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdibG9ja2VkJyk7XG4gIH1cblxuICBjbG9zZU1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICB0aGlzLm1vZGFsLmdldE5vZGUoKS5yZW1vdmUoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYmxvY2tlZCcpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuaW1wb3J0IE1vZGFsQ2FyZFZpZXcgZnJvbSAnLi9Nb2RhbENhcmRWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ2FydGljbGUnLFxuICAgICAgY3NzOiBbJ21lbnUtY29udGVudF9fY2FyZCcsICdjYXJkJ10sXG4gICAgICBjYWxsYmFjazogKCkgPT4gbmV3IE1vZGFsQ2FyZFZpZXcoY2FyZFBhcmFtcyksXG4gICAgfTtcbiAgICBzdXBlcihwYXJhbXMpO1xuICAgIHRoaXMuY29uZmlndXJlVmlldyhjYXJkUGFyYW1zKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVZpZXcoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnY2FyZC1pbWFnZSddLFxuICAgIH0pO1xuICAgIGltYWdlLmdldE5vZGUoKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke2NhcmRQYXJhbXMuaW1hZ2V9JylgO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydjYXJkLXRleHQnXSxcbiAgICB9KTtcbiAgICBjb25zdCB0aXRsZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdoNCcsXG4gICAgICBjc3M6IFsnY2FyZC10aXRsZSddLFxuICAgICAgdGV4dDogY2FyZFBhcmFtcy5uYW1lLFxuICAgIH0pO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ3AnLFxuICAgICAgY3NzOiBbJ2NhcmQtZGVzY3JpcHRpb24nXSxcbiAgICAgIHRleHQ6IGNhcmRQYXJhbXMuZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gICAgY29uc3QgcHJpY2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnY2FyZC1wcmljZSddLFxuICAgICAgdGV4dDogYCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICAgIGN1cnJlbmN5OiAnVVNEJyxcbiAgICAgIH0pLmZvcm1hdChjYXJkUGFyYW1zLnByaWNlKX1gLFxuICAgIH0pO1xuICAgIGNvbnRlbnQuYWRkSW5uZXJOb2RlKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpY2UpO1xuICAgIHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKGltYWdlLCBjb250ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuaW1wb3J0IENhcmRWaWV3IGZyb20gJy4vQ2FyZFZpZXcnO1xuaW1wb3J0IG1lbnVEYXRhIGZyb20gJy4vbWVudS1kYXRhJztcbmltcG9ydCByZWZyZXNoIGZyb20gJy4vcmVmcmVzaFN2Zyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3JpZXNDb250ZW50VmlldyBleHRlbmRzIFZpZXcge1xuICBkYXRhID0gbWVudURhdGE7XG5cbiAgY3VycmVudEZpbHRlciA9ICdjb2ZmZWUnO1xuXG4gIHZhcmlhbnQgPSAnbW9iaWxlJztcblxuICBjcmVhdGVkVmFyaWFudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21lbnUtY29udGVudCddLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICB0aGlzLmNyZWF0ZUNhcmRzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHRoaXMuY3JlYXRlQ2FyZHMoKSk7XG4gIH1cblxuICBjcmVhdGVDYXJkcyhjYXRlZ29yeSA9IHRoaXMuY3VycmVudEZpbHRlcikge1xuICAgIGlmICh0aGlzLmNoZWNrV2lkdGgoKSAmJiBjYXRlZ29yeSA9PT0gdGhpcy5jdXJyZW50RmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlZFZhcmlhbnQgPSB0aGlzLnZhcmlhbnQ7XG4gICAgdGhpcy5jdXJyZW50RmlsdGVyID0gY2F0ZWdvcnk7XG4gICAgY29uc3QgYXJyID0gdGhpcy5kYXRhXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSBjYXRlZ29yeSlcbiAgICAgIC5tYXAoKGVsKSA9PiBuZXcgQ2FyZFZpZXcoZWwpKTtcbiAgICBpZiAodGhpcy5jcmVhdGVkVmFyaWFudCA9PT0gJ2Rlc2t0b3AnKSB7XG4gICAgICB0aGlzLnNldENhcmRzKGFycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNob3dBbGwgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNzczogWydtZW51X19zaG93LWFsbCddLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuc2V0Q2FyZHMoYXJyKSxcbiAgICB9KTtcbiAgICBzaG93QWxsLmdldE5vZGUoKS5pbm5lckhUTUwgPSByZWZyZXNoO1xuICAgIHRoaXMuc2V0Q2FyZHMoYXJyLnNsaWNlKDAsIDQpLCBhcnIubGVuZ3RoID4gNCA/IHNob3dBbGwgOiBudWxsKTtcbiAgfVxuXG4gIHNldENhcmRzKG5vZGVzLCBidG4pIHtcbiAgICB0aGlzLnZpZXdOb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgdGhpcy5hZGRWaWV3SW5zaWRlKC4uLm5vZGVzKTtcbiAgICBpZiAoYnRuKSB7XG4gICAgICB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZShidG4pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrV2lkdGgoKSB7XG4gICAgY29uc3Qgd2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIHRoaXMudmFyaWFudCA9IHdpZHRoID4gMTAwMCA/ICdkZXNrdG9wJyA6ICdtb2JpbGUnO1xuICAgIHJldHVybiB0aGlzLnZhcmlhbnQgPT09IHRoaXMuY3JlYXRlZFZhcmlhbnQ7XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuLi9jbGFzc2VzL05vZGVDcmVhdGUnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcblxuY29uc3QgY2F0ZWdvcmllcyA9IFsnY29mZmVlJywgJ3RlYScsICdkZXNzZXJ0J107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3JpZXNOYXZpZ2F0aW9uVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihmdW5jKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydtZW51LW5hdmlnYXRpb24nXSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgdGhpcy5jb25maWd1cmVWaWV3KGZ1bmMpO1xuICB9XG5cbiAgY29uZmlndXJlVmlldyhmdW5jKSB7XG4gICAgY29uc3QgYnRucyA9IFsuLi5jYXRlZ29yaWVzXS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICAgIHRleHQ6IGl0ZW0sXG4gICAgICAgIGNzczogWydtZW51LW5hdmlnYXRpb25fX2J1dHRvbiddLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgIGZ1bmMoaXRlbSk7XG4gICAgICAgICAgYnRucy5mb3JFYWNoKChidG4pID0+IGJ0bi5zZXRDbGFzc05hbWVzKFsnbWVudS1uYXZpZ2F0aW9uX19idXR0b24nXSkpO1xuICAgICAgICAgIGJ1dHRvbi5zZXRDbGFzc05hbWVzKFsnbWVudS1uYXZpZ2F0aW9uX19idXR0b24nLCAnbWVudS1uYXZpZ2F0aW9uX19idXR0b25fc2VsZWN0ZWQnXSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBidXR0b247XG4gICAgfSk7XG4gICAgYnRuc1swXS5zZXRDbGFzc05hbWVzKFsnbWVudS1uYXZpZ2F0aW9uX19idXR0b24nLCAnbWVudS1uYXZpZ2F0aW9uX19idXR0b25fc2VsZWN0ZWQnXSk7XG4gICAgdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoLi4uYnRucyk7XG4gIH1cbn1cbiIsImltcG9ydCBWaWV3IGZyb20gJy4uL2NsYXNzZXMvVmlldyc7XG5pbXBvcnQgQ2F0ZWdvcmllc0NvbnRlbnRWaWV3IGZyb20gJy4vQ2F0ZWdvcmllc0NvbnRlbnRWaWV3JztcbmltcG9ydCBDYXRlZ29yaWVzTmF2aWdhdGlvblZpZXcgZnJvbSAnLi9DYXRlZ29yaWVzTmF2aWdhdGlvblZpZXcnO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yaWVzVmlldyBleHRlbmRzIFZpZXcge1xuICBuYXZpZ2F0aW9uO1xuXG4gIGNvbnRlbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydtZW51X19jb250YWluZXInXSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgY29udGFpbmVyLmFwcGVuZCh0aGlzLnZpZXdOb2RlLmdldE5vZGUoKSk7XG4gICAgdGhpcy5jb25maWd1cmVWaWV3KCk7XG4gIH1cblxuICBjb25maWd1cmVWaWV3KCkge1xuICAgIHRoaXMubmF2aWdhdGlvbiA9IG5ldyBDYXRlZ29yaWVzTmF2aWdhdGlvblZpZXcodGhpcy5zd2l0Y2hDYXRlZ29yeS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmNvbnRlbnQgPSBuZXcgQ2F0ZWdvcmllc0NvbnRlbnRWaWV3KCk7XG4gICAgdGhpcy5hZGRWaWV3SW5zaWRlKHRoaXMubmF2aWdhdGlvbiwgdGhpcy5jb250ZW50KTtcbiAgfVxuXG4gIHN3aXRjaENhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgdGhpcy5jb250ZW50LmNyZWF0ZUNhcmRzKGNhdGVnb3J5KTtcbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuXG5jb25zdCB3YXJuaW5nVGV4dCA9XG4gICdUaGUgY29zdCBpcyBub3QgZmluYWwuIERvd25sb2FkIG91ciBtb2JpbGUgYXBwIHRvIHNlZSB0aGUgZmluYWwgcHJpY2UgYW5kIHBsYWNlIHlvdXIgb3JkZXIuIEVhcm4gbG95YWx0eSBwb2ludHMgYW5kIGVuam95IHlvdXIgZmF2b3JpdGUgY29mZmVlIHdpdGggdXAgdG8gMjAlIGRpc2NvdW50Lic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsQ2FyZFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgYWRkQ29zdCA9IDA7XG5cbiAgYWRkaXRpdmVzID0gbmV3IE1hcCgpO1xuXG4gIHRvdGFsTm9kZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ2FydGljbGUnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmQnXSxcbiAgICAgIGNhbGxiYWNrOiAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgdGhpcy5kZWZhdWxQcmljZSA9ICtjYXJkUGFyYW1zLnByaWNlO1xuICAgIHRoaXMuY29uZmlndXJlVmlldyhjYXJkUGFyYW1zKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVZpZXcoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9faW1hZ2UnXSxcbiAgICB9KTtcbiAgICBjb25zdCBpbWFnZUNvbnRhaW5lciA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2NvbnRhaW5lciddLFxuICAgIH0pO1xuICAgIGltYWdlQ29udGFpbmVyLmFkZElubmVyTm9kZShpbWFnZSk7XG4gICAgaW1hZ2UuZ2V0Tm9kZSgpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7Y2FyZFBhcmFtcy5pbWFnZX0nKWA7XG4gICAgY29uc3QgZGV0YWlscyA9IHRoaXMuY3JlYXRlRGV0YWlscyhjYXJkUGFyYW1zKTtcbiAgICB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZShpbWFnZUNvbnRhaW5lciwgZGV0YWlscyk7XG4gICAgdGhpcy5zaG93TW9kYWwoKTtcbiAgfVxuXG4gIGNyZWF0ZURldGFpbHMoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX19kZXRhaWxzJ10sXG4gICAgfSk7XG4gICAgY29uc3QgdGl0bGUgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnaDQnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX3RpdGxlJ10sXG4gICAgICB0ZXh0OiBjYXJkUGFyYW1zLm5hbWUsXG4gICAgfSk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnaDQnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2Rlc2NyaXB0aW9uJ10sXG4gICAgICB0ZXh0OiBjYXJkUGFyYW1zLmRlc2NyaXB0aW9uLFxuICAgIH0pO1xuICAgIGNvbnN0IHNpemVTZWxlY3RvciA9IHRoaXMuY3JlYXRlU2l6ZVNlbGVjdG9yKGNhcmRQYXJhbXMpO1xuICAgIGNvbnN0IGFkZGl0aXZlc1NlbGVjdG9yID0gdGhpcy5jcmVhdGVBZGRpdGl2ZXNTZWxlY3RvcihjYXJkUGFyYW1zKTtcbiAgICBjb25zdCB0b3RhbFByaWNlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ3AnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX3ByaWNlJ10sXG4gICAgfSk7XG4gICAgdGhpcy50b3RhbE5vZGUgPSB0b3RhbFByaWNlO1xuICAgIGNvbnN0IHdhcm5pbmcgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fd2FybmluZyddLFxuICAgICAgdGV4dDogd2FybmluZ1RleHQsXG4gICAgfSk7XG4gICAgY29uc3QgY2xvc2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX19jbG9zZSddLFxuICAgICAgdGV4dDogJ0Nsb3NlJyxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmNsb3NlTW9kYWwoKSxcbiAgICB9KTtcbiAgICBkZXRhaWxzLmFkZElubmVyTm9kZShcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBzaXplU2VsZWN0b3IsXG4gICAgICBhZGRpdGl2ZXNTZWxlY3RvcixcbiAgICAgIHRvdGFsUHJpY2UsXG4gICAgICB3YXJuaW5nLFxuICAgICAgY2xvc2VcbiAgICApO1xuICAgIHRoaXMuY2FsY3VsYXRlVG90YWwoKTtcbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuXG4gIGNyZWF0ZVNpemVTZWxlY3RvcihjYXJkUGFyYW1zKSB7XG4gICAgY29uc3Qgc2l6ZUNvbnRhaW5lciA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX3NpemUtc2VsZWN0b3InXSxcbiAgICB9KTtcbiAgICBjb25zdCBzaXplU3VidGl0bGUgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fc3VidGl0bGUnXSxcbiAgICAgIHRleHQ6ICdTaXplJyxcbiAgICB9KTtcbiAgICBjb25zdCBidG5Db250YWluZXIgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX19idXR0b24tY29udGFpbmVyJywgJ3NpemVfX2J1dHRvbi1jb250YWluZXInXSxcbiAgICB9KTtcbiAgICBjb25zdCBidG5zID0gT2JqZWN0LnZhbHVlcyhjYXJkUGFyYW1zLnNpemVzKS5tYXAoKGluZm8pID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICAgIGNzczogWydtb2RhbC1jYXJkX19idXR0b24nXSxcbiAgICAgICAgdGV4dDogaW5mby5zaXplLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkQ29zdCA9ICtpbmZvWydhZGQtcHJpY2UnXTtcbiAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsKCk7XG4gICAgICAgICAgYnRucy5mb3JFYWNoKChidG4pID0+IGJ0bi5zZXRDbGFzc05hbWVzKFsnbW9kYWwtY2FyZF9fYnV0dG9uJ10pKTtcbiAgICAgICAgICBidXR0b24uc2V0Q2xhc3NOYW1lcyhbJ21vZGFsLWNhcmRfX2J1dHRvbicsICdtb2RhbC1jYXJkX19idXR0b25fc2VsZWN0ZWQnXSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBidXR0b247XG4gICAgfSk7XG4gICAgYnRuc1swXS5zZXRDbGFzc05hbWVzKFsnbW9kYWwtY2FyZF9fYnV0dG9uJywgJ21vZGFsLWNhcmRfX2J1dHRvbl9zZWxlY3RlZCddKTtcbiAgICBidG5Db250YWluZXIuYWRkSW5uZXJOb2RlKC4uLmJ0bnMpO1xuICAgIHNpemVDb250YWluZXIuYWRkSW5uZXJOb2RlKHNpemVTdWJ0aXRsZSwgYnRuQ29udGFpbmVyKTtcbiAgICByZXR1cm4gc2l6ZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGNyZWF0ZUFkZGl0aXZlc1NlbGVjdG9yKGNhcmRQYXJhbXMpIHtcbiAgICBjb25zdCBhZGRpdGl2ZXNDb250YWluZXIgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX19hZGRpdGl2ZXMtc2VsZWN0b3InXSxcbiAgICB9KTtcbiAgICBjb25zdCBzaXplU3VidGl0bGUgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fc3VidGl0bGUnXSxcbiAgICAgIHRleHQ6ICdBZGRpdGl2ZXMnLFxuICAgIH0pO1xuICAgIGNvbnN0IGJ0bkNvbnRhaW5lciA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2J1dHRvbi1jb250YWluZXInLCAnYWRkaXRpdmVfX2J1dHRvbi1jb250YWluZXInXSxcbiAgICB9KTtcbiAgICBjb25zdCBidG5zID0gWy4uLmNhcmRQYXJhbXMuYWRkaXRpdmVzXS5tYXAoKGluZm8sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBidXR0b24gPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fYnV0dG9uJ10sXG4gICAgICAgIHRleHQ6IGluZm8ubmFtZSxcbiAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5hZGRpdGl2ZXMuaGFzKGluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5hZGRpdGl2ZXMuZGVsZXRlKGluZGV4KTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRDbGFzc05hbWVzKFsnbW9kYWwtY2FyZF9fYnV0dG9uJ10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZGl0aXZlcy5zZXQoaW5kZXgsICtpbmZvWydhZGQtcHJpY2UnXSk7XG4gICAgICAgICAgICBidXR0b24uc2V0Q2xhc3NOYW1lcyhbJ21vZGFsLWNhcmRfX2J1dHRvbicsICdtb2RhbC1jYXJkX19idXR0b25fc2VsZWN0ZWQnXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWwoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9KTtcbiAgICBidG5Db250YWluZXIuYWRkSW5uZXJOb2RlKC4uLmJ0bnMpO1xuICAgIGFkZGl0aXZlc0NvbnRhaW5lci5hZGRJbm5lck5vZGUoc2l6ZVN1YnRpdGxlLCBidG5Db250YWluZXIpO1xuICAgIHJldHVybiBhZGRpdGl2ZXNDb250YWluZXI7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbCgpIHtcbiAgICBjb25zdCBmaW5hbENvc3QgPVxuICAgICAgdGhpcy5kZWZhdWxQcmljZSArIHRoaXMuYWRkQ29zdCArIFsuLi50aGlzLmFkZGl0aXZlcy52YWx1ZXMoKV0ucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gICAgdGhpcy50b3RhbE5vZGUuc2V0VGV4dENvbnRlbnQoXG4gICAgICBgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgICAgfSkuZm9ybWF0KGZpbmFsQ29zdCl9YFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBjb2ZmZWUxIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2NvZmZlZS9jb2ZmZWUtMS5qcGcnO1xuaW1wb3J0IGNvZmZlZTIgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvY29mZmVlL2NvZmZlZS0yLmpwZyc7XG5pbXBvcnQgY29mZmVlMyBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9jb2ZmZWUvY29mZmVlLTMuanBnJztcbmltcG9ydCBjb2ZmZWU0IGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2NvZmZlZS9jb2ZmZWUtNC5qcGcnO1xuaW1wb3J0IGNvZmZlZTUgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvY29mZmVlL2NvZmZlZS01LmpwZyc7XG5pbXBvcnQgY29mZmVlNiBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9jb2ZmZWUvY29mZmVlLTYuanBnJztcbmltcG9ydCBjb2ZmZWU3IGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2NvZmZlZS9jb2ZmZWUtNy5qcGcnO1xuaW1wb3J0IGNvZmZlZTggZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvY29mZmVlL2NvZmZlZS04LmpwZyc7XG5cbmltcG9ydCB0ZWExIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L3RlYS90ZWEtMS5wbmcnO1xuaW1wb3J0IHRlYTIgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvdGVhL3RlYS0yLnBuZyc7XG5pbXBvcnQgdGVhMyBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS90ZWEvdGVhLTMucG5nJztcbmltcG9ydCB0ZWE0IGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L3RlYS90ZWEtNC5wbmcnO1xuXG5pbXBvcnQgZGVzc2VydDEgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvZGVzc2VydC9kZXNzZXJ0LTEucG5nJztcbmltcG9ydCBkZXNzZXJ0MiBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9kZXNzZXJ0L2Rlc3NlcnQtMi5wbmcnO1xuaW1wb3J0IGRlc3NlcnQzIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2Rlc3NlcnQvZGVzc2VydC0zLnBuZyc7XG5pbXBvcnQgZGVzc2VydDQgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvZGVzc2VydC9kZXNzZXJ0LTQucG5nJztcbmltcG9ydCBkZXNzZXJ0NSBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9kZXNzZXJ0L2Rlc3NlcnQtNS5wbmcnO1xuaW1wb3J0IGRlc3NlcnQ2IGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2Rlc3NlcnQvZGVzc2VydC02LnBuZyc7XG5pbXBvcnQgZGVzc2VydDcgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvZGVzc2VydC9kZXNzZXJ0LTcucG5nJztcbmltcG9ydCBkZXNzZXJ0OCBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9kZXNzZXJ0L2Rlc3NlcnQtOC5wbmcnO1xuXG5jb25zdCBtZW51RGF0YSA9IFtcbiAge1xuICAgIG5hbWU6ICdJcmlzaCBjb2ZmZWUnLFxuICAgIGRlc2NyaXB0aW9uOiAnRnJhZ3JhbnQgYmxhY2sgY29mZmVlIHdpdGggSmFtZXNvbiBJcmlzaCB3aGlza2V5IGFuZCB3aGlwcGVkIG1pbGsnLFxuICAgIHByaWNlOiAnNy4wMCcsXG4gICAgY2F0ZWdvcnk6ICdjb2ZmZWUnLFxuICAgIGltYWdlOiBjb2ZmZWUxLFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICcyMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzMwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnNDAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1Z2FyJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdDaW5uYW1vbicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3lydXAnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnS2FobHVhIGNvZmZlZScsXG4gICAgZGVzY3JpcHRpb246ICdDbGFzc2ljIGNvZmZlZSB3aXRoIG1pbGsgYW5kIEthaGx1YSBsaXF1ZXVyIHVuZGVyIGEgY2FwIG9mIGZyb3RoZWQgbWlsaycsXG4gICAgcHJpY2U6ICc3LjAwJyxcbiAgICBjYXRlZ29yeTogJ2NvZmZlZScsXG4gICAgaW1hZ2U6IGNvZmZlZTIsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMzAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICc0MDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VnYXInLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0Npbm5hbW9uJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTeXJ1cCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdIb25leSByYWYnLFxuICAgIGRlc2NyaXB0aW9uOiAnRXNwcmVzc28gd2l0aCBmcm90aGVkIG1pbGssIGNyZWFtIGFuZCBhcm9tYXRpYyBob25leScsXG4gICAgcHJpY2U6ICc1LjUwJyxcbiAgICBjYXRlZ29yeTogJ2NvZmZlZScsXG4gICAgaW1hZ2U6IGNvZmZlZTMsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMzAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICc0MDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VnYXInLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0Npbm5hbW9uJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTeXJ1cCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdJY2UgY2FwcHVjY2lubycsXG4gICAgZGVzY3JpcHRpb246ICdDYXBwdWNjaW5vIHdpdGggc29mdCB0aGljayBmb2FtIGluIHN1bW1lciB2ZXJzaW9uIHdpdGggaWNlJyxcbiAgICBwcmljZTogJzUuMDAnLFxuICAgIGNhdGVnb3J5OiAnY29mZmVlJyxcbiAgICBpbWFnZTogY29mZmVlNCxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2lubmFtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0VzcHJlc3NvJyxcbiAgICBkZXNjcmlwdGlvbjogJ0NsYXNzaWMgYmxhY2sgY29mZmVlJyxcbiAgICBwcmljZTogJzQuNTAnLFxuICAgIGNhdGVnb3J5OiAnY29mZmVlJyxcbiAgICBpbWFnZTogY29mZmVlNSxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2lubmFtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0xhdHRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VzcHJlc3NvIGNvZmZlZSB3aXRoIHRoZSBhZGRpdGlvbiBvZiBzdGVhbWVkIG1pbGsgYW5kIGRlbnNlIG1pbGsgZm9hbScsXG4gICAgcHJpY2U6ICc1LjUwJyxcbiAgICBjYXRlZ29yeTogJ2NvZmZlZScsXG4gICAgaW1hZ2U6IGNvZmZlZTYsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMzAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICc0MDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VnYXInLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0Npbm5hbW9uJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTeXJ1cCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdMYXR0ZSBtYWNjaGlhdG8nLFxuICAgIGRlc2NyaXB0aW9uOiAnRXNwcmVzc28gd2l0aCBmcm90aGVkIG1pbGsgYW5kIGNob2NvbGF0ZScsXG4gICAgcHJpY2U6ICc1LjUwJyxcbiAgICBjYXRlZ29yeTogJ2NvZmZlZScsXG4gICAgaW1hZ2U6IGNvZmZlZTcsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMzAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICc0MDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VnYXInLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0Npbm5hbW9uJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTeXJ1cCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdDb2ZmZWUgd2l0aCBjb2duYWMnLFxuICAgIGRlc2NyaXB0aW9uOiAnRnJhZ3JhbnQgYmxhY2sgY29mZmVlIHdpdGggY29nbmFjIGFuZCB3aGlwcGVkIGNyZWFtJyxcbiAgICBwcmljZTogJzYuNTAnLFxuICAgIGNhdGVnb3J5OiAnY29mZmVlJyxcbiAgICBpbWFnZTogY29mZmVlOCxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2lubmFtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ01vcm9jY2FuJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdGcmFncmFudCBibGFjayB0ZWEgd2l0aCB0aGUgYWRkaXRpb24gb2YgdGFuZ2VyaW5lLCBjaW5uYW1vbiwgaG9uZXksIGxlbW9uIGFuZCBtaW50JyxcbiAgICBwcmljZTogJzQuNTAnLFxuICAgIGNhdGVnb3J5OiAndGVhJyxcbiAgICBpbWFnZTogdGVhMSxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTGVtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0dpbmdlcicsXG4gICAgZGVzY3JpcHRpb246ICdPcmlnaW5hbCBibGFjayB0ZWEgd2l0aCBmcmVzaCBnaW5nZXIsIGxlbW9uIGFuZCBob25leScsXG4gICAgcHJpY2U6ICc1LjAwJyxcbiAgICBjYXRlZ29yeTogJ3RlYScsXG4gICAgaW1hZ2U6IHRlYTIsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMzAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICc0MDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VnYXInLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0xlbW9uJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTeXJ1cCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdDcmFuYmVycnknLFxuICAgIGRlc2NyaXB0aW9uOiAnSW52aWdvcmF0aW5nIGJsYWNrIHRlYSB3aXRoIGNyYW5iZXJyeSBhbmQgaG9uZXknLFxuICAgIHByaWNlOiAnNS4wMCcsXG4gICAgY2F0ZWdvcnk6ICd0ZWEnLFxuICAgIGltYWdlOiB0ZWEzLFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICcyMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzMwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnNDAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1Z2FyJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdMZW1vbicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3lydXAnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnU2VhIGJ1Y2t0aG9ybicsXG4gICAgZGVzY3JpcHRpb246ICdUb25pbmcgc3dlZXQgYmxhY2sgdGVhIHdpdGggc2VhIGJ1Y2t0aG9ybiwgZnJlc2ggdGh5bWUgYW5kIGNpbm5hbW9uJyxcbiAgICBwcmljZTogJzUuNTAnLFxuICAgIGNhdGVnb3J5OiAndGVhJyxcbiAgICBpbWFnZTogdGVhNCxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTGVtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ01hcmJsZSBjaGVlc2VjYWtlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BoaWxhZGVscGhpYSBjaGVlc2Ugd2l0aCBsZW1vbiB6ZXN0IG9uIGEgbGlnaHQgc3BvbmdlIGNha2UgYW5kIHJlZCBjdXJyYW50IGphbScsXG4gICAgcHJpY2U6ICczLjUwJyxcbiAgICBjYXRlZ29yeTogJ2Rlc3NlcnQnLFxuICAgIGltYWdlOiBkZXNzZXJ0MSxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnNTAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMTAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JlcnJpZXMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ051dHMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0phbScsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdSZWQgdmVsdmV0JyxcbiAgICBkZXNjcmlwdGlvbjogJ0xheWVyIGNha2Ugd2l0aCBjcmVhbSBjaGVlc2UgZnJvc3RpbmcnLFxuICAgIHByaWNlOiAnNC4wMCcsXG4gICAgY2F0ZWdvcnk6ICdkZXNzZXJ0JyxcbiAgICBpbWFnZTogZGVzc2VydDIsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzUwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzEwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICcyMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdCZXJyaWVzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdOdXRzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdKYW0nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnQ2hlZXNlY2FrZXMnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1NvZnQgY290dGFnZSBjaGVlc2UgcGFuY2FrZXMgd2l0aCBzb3VyIGNyZWFtIGFuZCBmcmVzaCBiZXJyaWVzIGFuZCBzcHJpbmtsZWQgd2l0aCBwb3dkZXJlZCBzdWdhcicsXG4gICAgcHJpY2U6ICc0LjUwJyxcbiAgICBjYXRlZ29yeTogJ2Rlc3NlcnQnLFxuICAgIGltYWdlOiBkZXNzZXJ0MyxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnNTAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMTAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JlcnJpZXMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ051dHMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0phbScsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdDcmVtZSBicnVsZWUnLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVsaWNhdGUgY3JlYW15IGRlc3NlcnQgaW4gYSBjYXJhbWVsIGJhc2tldCB3aXRoIHdpbGQgYmVycmllcycsXG4gICAgcHJpY2U6ICc0LjAwJyxcbiAgICBjYXRlZ29yeTogJ2Rlc3NlcnQnLFxuICAgIGltYWdlOiBkZXNzZXJ0NCxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnNTAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMTAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JlcnJpZXMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ051dHMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0phbScsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdQYW5jYWtlcycsXG4gICAgZGVzY3JpcHRpb246ICdUZW5kZXIgcGFuY2FrZXMgd2l0aCBzdHJhd2JlcnJ5IGphbSBhbmQgZnJlc2ggc3RyYXdiZXJyaWVzJyxcbiAgICBwcmljZTogJzQuNTAnLFxuICAgIGNhdGVnb3J5OiAnZGVzc2VydCcsXG4gICAgaW1hZ2U6IGRlc3NlcnQ1LFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICc1MCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICcxMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnMjAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnQmVycmllcycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTnV0cycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnSmFtJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0hvbmV5IGNha2UnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2xhc3NpYyBob25leSBjYWtlIHdpdGggZGVsaWNhdGUgY3VzdGFyZCcsXG4gICAgcHJpY2U6ICc0LjUwJyxcbiAgICBjYXRlZ29yeTogJ2Rlc3NlcnQnLFxuICAgIGltYWdlOiBkZXNzZXJ0NixcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnNTAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMTAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JlcnJpZXMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ051dHMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0phbScsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdDaG9jb2xhdGUgY2FrZScsXG4gICAgZGVzY3JpcHRpb246ICdDYWtlIHdpdGggaG90IGNob2NvbGF0ZSBmaWxsaW5nIGFuZCBudXRzIHdpdGggZHJpZWQgYXByaWNvdHMnLFxuICAgIHByaWNlOiAnNS41MCcsXG4gICAgY2F0ZWdvcnk6ICdkZXNzZXJ0JyxcbiAgICBpbWFnZTogZGVzc2VydDcsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzUwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzEwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICcyMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdCZXJyaWVzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdOdXRzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdKYW0nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnQmxhY2sgZm9yZXN0JyxcbiAgICBkZXNjcmlwdGlvbjogJ0EgY29tYmluYXRpb24gb2YgdGhpbiBzcG9uZ2UgY2FrZSB3aXRoIGNoZXJyeSBqYW0gYW5kIGxpZ2h0IGNob2NvbGF0ZSBtb3Vzc2UnLFxuICAgIHByaWNlOiAnNi41MCcsXG4gICAgY2F0ZWdvcnk6ICdkZXNzZXJ0JyxcbiAgICBpbWFnZTogZGVzc2VydDgsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzUwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzEwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICcyMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdCZXJyaWVzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdOdXRzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdKYW0nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudURhdGE7XG4iLCJjb25zdCByZWZyZXNoID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiPlxuPHBhdGggZD1cIk0yMS44ODgzIDEzLjVDMjEuMTY0NSAxOC4zMTEzIDE3LjAxMyAyMiAxMiAyMkM2LjQ3NzE1IDIyIDIgMTcuNTIyOCAyIDEyQzIgNi40NzcxNSA2LjQ3NzE1IDIgMTIgMkMxNi4xMDA2IDIgMTkuNjI0OCA0LjQ2ODE5IDIxLjE2NzkgOFwiIHN0cm9rZT1cIiM0MDNGM0RcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG48cGF0aCBkPVwiTTE3IDhIMjEuNEMyMS43MzE0IDggMjIgNy43MzEzNyAyMiA3LjRWM1wiIHN0cm9rZT1cIiM0MDNGM0RcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG48L3N2Zz5gO1xuXG5leHBvcnQgZGVmYXVsdCByZWZyZXNoO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL21lbnUuc2Nzcyc7XG5pbXBvcnQgQ2F0ZWdvcmllc1ZpZXcgZnJvbSAnLi4vanMvbWVudS9DYXRlZ29yaWVzVmlldyc7XG5pbXBvcnQgQnVyZ2VyVmlldyBmcm9tICcuLi9qcy9idXJnZXIvQnVyZ2VyJztcblxuY29uc3QgYXBwID0gbmV3IENhdGVnb3JpZXNWaWV3KCk7XG5jb25zdCBidXJnZXIgPSBuZXcgQnVyZ2VyVmlldyhmYWxzZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=