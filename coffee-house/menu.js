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
    this.variant = width > 768 ? 'desktop' : 'mobile';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FtQztBQUNhOztBQUVqQyx5QkFBeUIscURBQUk7QUFDNUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixPQUFPO0FBQ1AsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixPQUFPO0FBQ1AsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixPQUFPO0FBQ1AsVUFBVSwyREFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxVQUFVLDJEQUFXO0FBQ3JCO0FBQ0Esc0NBQXNDLDZCQUE2QjtBQUNuRTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOUVlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRXVDOztBQUV4QjtBQUNmOztBQUVBO0FBQ0Esd0JBQXdCLG1EQUFXO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsbURBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DZ0Q7QUFDYjtBQUNTOztBQUU3Qix1QkFBdUIscURBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsc0RBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsMkRBQVc7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTCxvREFBb0QsaUJBQWlCO0FBQ3JFLHdCQUF3QiwyREFBVztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMLHNCQUFzQiwyREFBVztBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNEJBQTRCLDJEQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxzQkFBc0IsMkRBQVc7QUFDakM7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsT0FBTywyQkFBMkI7QUFDbEMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlDZ0Q7QUFDYjtBQUNEO0FBQ0M7QUFDQTs7QUFFcEIsb0NBQW9DLHFEQUFJO0FBQ3ZELFNBQVMsa0RBQVE7O0FBRWpCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlEQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJEQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQ0FBa0MsbURBQU87QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNURnRDtBQUNiOztBQUVuQzs7QUFFZSx1Q0FBdUMscURBQUk7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLDJEQUFXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENtQztBQUN5QjtBQUNNOztBQUVsRTs7QUFFZSw2QkFBNkIscURBQUk7QUFDaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLGlFQUF3QjtBQUNsRCx1QkFBdUIsOERBQXFCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJnRDtBQUNiOztBQUVuQztBQUNBOztBQUVlLDRCQUE0QixxREFBSTtBQUMvQzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiwyREFBVztBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMLCtCQUErQiwyREFBVztBQUMxQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esb0RBQW9ELGlCQUFpQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwyREFBVztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMLHNCQUFzQiwyREFBVztBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNEJBQTRCLDJEQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMkJBQTJCLDJEQUFXO0FBQ3RDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3QkFBd0IsMkRBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHNCQUFzQiwyREFBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsMkRBQVc7QUFDekM7QUFDQTtBQUNBLEtBQUs7QUFDTCw2QkFBNkIsMkRBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDZCQUE2QiwyREFBVztBQUN4QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUJBQXlCLDJEQUFXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsMkRBQVc7QUFDOUM7QUFDQTtBQUNBLEtBQUs7QUFDTCw2QkFBNkIsMkRBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDZCQUE2QiwyREFBVztBQUN4QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUJBQXlCLDJEQUFXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTyxvQkFBb0I7QUFDM0I7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZLa0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFWTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1FQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNkRBQUk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw2REFBSTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDhEQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOERBQUk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzRUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzRUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNFQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMzdUJ4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0x2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7QUNmcUI7QUFDa0M7QUFDVjs7QUFFN0MsZ0JBQWdCLCtEQUFjO0FBQzlCLG1CQUFtQix5REFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL21lbnUvbWVudS5zY3NzPzFmZTQiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvYnVyZ2VyL0J1cmdlci5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9jbGFzc2VzL05vZGVDcmVhdGUuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvY2xhc3Nlcy9WaWV3LmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlLy4vc3JjL2pzL21lbnUvQ2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9DYXRlZ29yaWVzQ29udGVudFZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9DYXRlZ29yaWVzTmF2aWdhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9DYXRlZ29yaWVzVmlldy5qcyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9qcy9tZW51L01vZGFsQ2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9tZW51LWRhdGEuanMiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2UvLi9zcmMvanMvbWVudS9yZWZyZXNoU3ZnLmpzIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0NvZmZlIEhvdXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQ29mZmUgSG91c2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9Db2ZmZSBIb3VzZS8uL3NyYy9tZW51L21lbnUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcbmltcG9ydCBOb2RlQ3JlYXRvciBmcm9tICcuLi9jbGFzc2VzL05vZGVDcmVhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXJnZXJWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGJ1cmdlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXInKTtcblxuICBpc09wZW5lZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGlzSG9tZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnYnVyZ2VyLW1lbnUnXSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLm1hbmFnZU1lbnUoKSxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gICAgdGhpcy5nZW5lcmF0ZU1lbnUoaXNIb21lKTtcbiAgICB0aGlzLmJ1cmdlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubWFuYWdlTWVudS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuaW5uZXJXaWR0aCA+IDc2OCAmJiB0aGlzLmlzT3BlbmVkKSB7XG4gICAgICAgIHRoaXMubWFuYWdlTWVudSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2VuZXJhdGVNZW51KGlzSG9tZSkge1xuICAgIGNvbnN0IHN0YXJ0SWQgPSBpc0hvbWUgPyAnJyA6ICcuL2hvbWUuaHRtbCc7XG4gICAgY29uc3QgbGlua3MgPSBbXG4gICAgICBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgY3NzOiBbJ2J1cmdlci1tZW51X19saW5rJ10sXG4gICAgICAgIHRleHQ6ICdGYXZvcml0ZSBjb2ZmZWUnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNmYXZvdXJpdGUtY29mZmVlYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnQWJvdXQnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNhYm91dGAsXG4gICAgICB9KSxcbiAgICAgIG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2EnLFxuICAgICAgICBjc3M6IFsnYnVyZ2VyLW1lbnVfX2xpbmsnXSxcbiAgICAgICAgdGV4dDogJ01vYmlsZSBhcHAnLFxuICAgICAgICBocmVmOiBgJHtzdGFydElkfSNtb2JpbGUtYXBwYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluayddLFxuICAgICAgICB0ZXh0OiAnQ29udGFjdCB1cycsXG4gICAgICAgIGhyZWY6IGAjZm9vdGVyYCxcbiAgICAgIH0pLFxuICAgICAgbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYScsXG4gICAgICAgIGNzczogWydidXJnZXItbWVudV9fbGluaycsIGAke2lzSG9tZSA/ICcxJyA6ICdub25lLWV2ZW50cyd9YF0sXG4gICAgICAgIHRleHQ6ICdNZW51JyxcbiAgICAgICAgaHJlZjogJy4vbWVudS5odG1sJyxcbiAgICAgIH0pLFxuICAgIF07XG4gICAgdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoLi4ubGlua3MpO1xuICB9XG5cbiAgbWFuYWdlTWVudSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpLmNsYXNzTGlzdC5hZGQoJ2J1cmdlci1tZW51X29wZW4nKTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdOb2RlLnNldENsYXNzTmFtZXMoWydidXJnZXItbWVudSddKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKS5yZW1vdmUoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2Jsb2NrZWQnKTtcbiAgICB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdidXJnZXJfYWN0aXZlJyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGVDcmVhdG9yIHtcbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5ub2RlID0gdGhpcy5jcmVhdGVOb2RlKHBhcmFtcyk7XG4gIH1cblxuICBnZXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGU7XG4gIH1cblxuICBjcmVhdGVOb2RlKHBhcmFtcykge1xuICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocGFyYW1zLnRhZyk7XG4gICAgdGhpcy5zZXRDbGFzc05hbWVzKHBhcmFtcy5jc3MpO1xuICAgIHRoaXMuc2V0VGV4dENvbnRlbnQocGFyYW1zLnRleHQpO1xuICAgIHRoaXMuc2V0SWQocGFyYW1zLmlkKTtcbiAgICBpZiAocGFyYW1zLmNhbGxiYWNrKSB0aGlzLnNldENhbGxiYWNrKHBhcmFtcy5jYWxsYmFjayk7XG4gICAgaWYgKHBhcmFtcy5ocmVmKSB0aGlzLnNldEhyZWYocGFyYW1zLmhyZWYpO1xuICAgIHJldHVybiB0aGlzLm5vZGU7XG4gIH1cblxuICBzZXRIcmVmKHN0cmluZykge1xuICAgIHRoaXMubm9kZS5ocmVmID0gc3RyaW5nO1xuICB9XG5cbiAgc2V0Q2xhc3NOYW1lcyhjc3NMaXN0KSB7XG4gICAgaWYgKGNzc0xpc3QpIHtcbiAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAnJztcbiAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKC4uLmNzc0xpc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRleHRDb250ZW50KHRleHQpIHtcbiAgICBpZiAodGV4dCkgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfVxuXG4gIHNldENhbGxiYWNrKGNhbGxiYWNrLCBoYW5kbGVyID0gJ2NsaWNrJykge1xuICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKGhhbmRsZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNldElkKGlkKSB7XG4gICAgaWYgKGlkKSB0aGlzLm5vZGUuaWQgPSBpZDtcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgYWRkSW5uZXJOb2RlKC4uLmxpc3QpIHtcbiAgICBsaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZUNyZWF0b3IpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZChub2RlLmdldE5vZGUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJlcGVuZElubmVyTm9kZSguLi5saXN0KSB7XG4gICAgbGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGVDcmVhdG9yKSB7XG4gICAgICAgIHRoaXMubm9kZS5wcmVwZW5kKG5vZGUuZ2V0Tm9kZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm9kZS5wcmVwZW5kKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQWxsQ2hpbGRyZW4oKSB7XG4gICAgd2hpbGUgKHRoaXMubm9kZS5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU5vZGUoKSB7XG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi9Ob2RlQ3JlYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIG1vZGFsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLnZpZXdOb2RlID0gbmV3IE5vZGVDcmVhdG9yKHBhcmFtcyk7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXdOb2RlLmdldE5vZGUoKTtcbiAgfVxuXG4gIGFkZFZpZXdJbnNpZGUoLi4udmlldykge1xuICAgIHZpZXcuZm9yRWFjaCgoaW5zdCkgPT4gdGhpcy52aWV3Tm9kZS5hZGRJbm5lck5vZGUoaW5zdC5nZXRFbGVtZW50KCkpKTtcbiAgfVxuXG4gIHNob3dNb2RhbCgpIHtcbiAgICBjb25zdCBtb2RhbCA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsJ10sXG4gICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5jbG9zZU1vZGFsKCksXG4gICAgfSk7XG4gICAgbW9kYWwuYWRkSW5uZXJOb2RlKHRoaXMudmlld05vZGUpO1xuICAgIHRoaXMubW9kYWwgPSBtb2RhbDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLm1vZGFsLmdldE5vZGUoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdibG9ja2VkJyk7XG4gIH1cblxuICBjbG9zZU1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICB0aGlzLm1vZGFsLmdldE5vZGUoKS5yZW1vdmUoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYmxvY2tlZCcpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuaW1wb3J0IE1vZGFsQ2FyZFZpZXcgZnJvbSAnLi9Nb2RhbENhcmRWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHRhZzogJ2FydGljbGUnLFxuICAgICAgY3NzOiBbJ21lbnUtY29udGVudF9fY2FyZCcsICdjYXJkJ10sXG4gICAgICBjYWxsYmFjazogKCkgPT4gbmV3IE1vZGFsQ2FyZFZpZXcoY2FyZFBhcmFtcyksXG4gICAgfTtcbiAgICBzdXBlcihwYXJhbXMpO1xuICAgIHRoaXMuY29uZmlndXJlVmlldyhjYXJkUGFyYW1zKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVZpZXcoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnY2FyZC1pbWFnZSddLFxuICAgIH0pO1xuICAgIGltYWdlLmdldE5vZGUoKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke2NhcmRQYXJhbXMuaW1hZ2V9JylgO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydjYXJkLXRleHQnXSxcbiAgICB9KTtcbiAgICBjb25zdCB0aXRsZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdoNCcsXG4gICAgICBjc3M6IFsnY2FyZC10aXRsZSddLFxuICAgICAgdGV4dDogY2FyZFBhcmFtcy5uYW1lLFxuICAgIH0pO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ3AnLFxuICAgICAgY3NzOiBbJ2NhcmQtZGVzY3JpcHRpb24nXSxcbiAgICAgIHRleHQ6IGNhcmRQYXJhbXMuZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gICAgY29uc3QgcHJpY2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnY2FyZC1wcmljZSddLFxuICAgICAgdGV4dDogYCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICAgIGN1cnJlbmN5OiAnVVNEJyxcbiAgICAgIH0pLmZvcm1hdChjYXJkUGFyYW1zLnByaWNlKX1gLFxuICAgIH0pO1xuICAgIGNvbnRlbnQuYWRkSW5uZXJOb2RlKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpY2UpO1xuICAgIHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKGltYWdlLCBjb250ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuaW1wb3J0IENhcmRWaWV3IGZyb20gJy4vQ2FyZFZpZXcnO1xuaW1wb3J0IG1lbnVEYXRhIGZyb20gJy4vbWVudS1kYXRhJztcbmltcG9ydCByZWZyZXNoIGZyb20gJy4vcmVmcmVzaFN2Zyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3JpZXNDb250ZW50VmlldyBleHRlbmRzIFZpZXcge1xuICBkYXRhID0gbWVudURhdGE7XG5cbiAgY3VycmVudEZpbHRlciA9ICdjb2ZmZWUnO1xuXG4gIHZhcmlhbnQgPSAnbW9iaWxlJztcblxuICBjcmVhdGVkVmFyaWFudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21lbnUtY29udGVudCddLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICB0aGlzLmNyZWF0ZUNhcmRzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHRoaXMuY3JlYXRlQ2FyZHMoKSk7XG4gIH1cblxuICBjcmVhdGVDYXJkcyhjYXRlZ29yeSA9IHRoaXMuY3VycmVudEZpbHRlcikge1xuICAgIGlmICh0aGlzLmNoZWNrV2lkdGgoKSAmJiBjYXRlZ29yeSA9PT0gdGhpcy5jdXJyZW50RmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlZFZhcmlhbnQgPSB0aGlzLnZhcmlhbnQ7XG4gICAgdGhpcy5jdXJyZW50RmlsdGVyID0gY2F0ZWdvcnk7XG4gICAgY29uc3QgYXJyID0gdGhpcy5kYXRhXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSBjYXRlZ29yeSlcbiAgICAgIC5tYXAoKGVsKSA9PiBuZXcgQ2FyZFZpZXcoZWwpKTtcbiAgICBpZiAodGhpcy5jcmVhdGVkVmFyaWFudCA9PT0gJ2Rlc2t0b3AnKSB7XG4gICAgICB0aGlzLnNldENhcmRzKGFycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNob3dBbGwgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNzczogWydtZW51X19zaG93LWFsbCddLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuc2V0Q2FyZHMoYXJyKSxcbiAgICB9KTtcbiAgICBzaG93QWxsLmdldE5vZGUoKS5pbm5lckhUTUwgPSByZWZyZXNoO1xuICAgIHRoaXMuc2V0Q2FyZHMoYXJyLnNsaWNlKDAsIDQpLCBhcnIubGVuZ3RoID4gNCA/IHNob3dBbGwgOiBudWxsKTtcbiAgfVxuXG4gIHNldENhcmRzKG5vZGVzLCBidG4pIHtcbiAgICB0aGlzLnZpZXdOb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgdGhpcy5hZGRWaWV3SW5zaWRlKC4uLm5vZGVzKTtcbiAgICBpZiAoYnRuKSB7XG4gICAgICB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZShidG4pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrV2lkdGgoKSB7XG4gICAgY29uc3Qgd2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIHRoaXMudmFyaWFudCA9IHdpZHRoID4gNzY4ID8gJ2Rlc2t0b3AnIDogJ21vYmlsZSc7XG4gICAgcmV0dXJuIHRoaXMudmFyaWFudCA9PT0gdGhpcy5jcmVhdGVkVmFyaWFudDtcbiAgfVxufVxuIiwiaW1wb3J0IE5vZGVDcmVhdG9yIGZyb20gJy4uL2NsYXNzZXMvTm9kZUNyZWF0ZSc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9jbGFzc2VzL1ZpZXcnO1xuXG5jb25zdCBjYXRlZ29yaWVzID0gWydjb2ZmZWUnLCAndGVhJywgJ2Rlc3NlcnQnXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcmllc05hdmlnYXRpb25WaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21lbnUtbmF2aWdhdGlvbiddLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICB0aGlzLmNvbmZpZ3VyZVZpZXcoZnVuYyk7XG4gIH1cblxuICBjb25maWd1cmVWaWV3KGZ1bmMpIHtcbiAgICBjb25zdCBidG5zID0gWy4uLmNhdGVnb3JpZXNdLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9uID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgdGV4dDogaXRlbSxcbiAgICAgICAgY3NzOiBbJ21lbnUtbmF2aWdhdGlvbl9fYnV0dG9uJ10sXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgZnVuYyhpdGVtKTtcbiAgICAgICAgICBidG5zLmZvckVhY2goKGJ0bikgPT4gYnRuLnNldENsYXNzTmFtZXMoWydtZW51LW5hdmlnYXRpb25fX2J1dHRvbiddKSk7XG4gICAgICAgICAgYnV0dG9uLnNldENsYXNzTmFtZXMoWydtZW51LW5hdmlnYXRpb25fX2J1dHRvbicsICdtZW51LW5hdmlnYXRpb25fX2J1dHRvbl9zZWxlY3RlZCddKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9KTtcbiAgICBidG5zWzBdLnNldENsYXNzTmFtZXMoWydtZW51LW5hdmlnYXRpb25fX2J1dHRvbicsICdtZW51LW5hdmlnYXRpb25fX2J1dHRvbl9zZWxlY3RlZCddKTtcbiAgICB0aGlzLnZpZXdOb2RlLmFkZElubmVyTm9kZSguLi5idG5zKTtcbiAgfVxufVxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vY2xhc3Nlcy9WaWV3JztcbmltcG9ydCBDYXRlZ29yaWVzQ29udGVudFZpZXcgZnJvbSAnLi9DYXRlZ29yaWVzQ29udGVudFZpZXcnO1xuaW1wb3J0IENhdGVnb3JpZXNOYXZpZ2F0aW9uVmlldyBmcm9tICcuL0NhdGVnb3JpZXNOYXZpZ2F0aW9uVmlldyc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3JpZXNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIG5hdmlnYXRpb247XG5cbiAgY29udGVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21lbnVfX2NvbnRhaW5lciddLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICBjb250YWluZXIuYXBwZW5kKHRoaXMudmlld05vZGUuZ2V0Tm9kZSgpKTtcbiAgICB0aGlzLmNvbmZpZ3VyZVZpZXcoKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVZpZXcoKSB7XG4gICAgdGhpcy5uYXZpZ2F0aW9uID0gbmV3IENhdGVnb3JpZXNOYXZpZ2F0aW9uVmlldyh0aGlzLnN3aXRjaENhdGVnb3J5LmJpbmQodGhpcykpO1xuICAgIHRoaXMuY29udGVudCA9IG5ldyBDYXRlZ29yaWVzQ29udGVudFZpZXcoKTtcbiAgICB0aGlzLmFkZFZpZXdJbnNpZGUodGhpcy5uYXZpZ2F0aW9uLCB0aGlzLmNvbnRlbnQpO1xuICB9XG5cbiAgc3dpdGNoQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICB0aGlzLmNvbnRlbnQuY3JlYXRlQ2FyZHMoY2F0ZWdvcnkpO1xuICB9XG59XG4iLCJpbXBvcnQgTm9kZUNyZWF0b3IgZnJvbSAnLi4vY2xhc3Nlcy9Ob2RlQ3JlYXRlJztcbmltcG9ydCBWaWV3IGZyb20gJy4uL2NsYXNzZXMvVmlldyc7XG5cbmNvbnN0IHdhcm5pbmdUZXh0ID1cbiAgJ1RoZSBjb3N0IGlzIG5vdCBmaW5hbC4gRG93bmxvYWQgb3VyIG1vYmlsZSBhcHAgdG8gc2VlIHRoZSBmaW5hbCBwcmljZSBhbmQgcGxhY2UgeW91ciBvcmRlci4gRWFybiBsb3lhbHR5IHBvaW50cyBhbmQgZW5qb3kgeW91ciBmYXZvcml0ZSBjb2ZmZWUgd2l0aCB1cCB0byAyMCUgZGlzY291bnQuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWxDYXJkVmlldyBleHRlbmRzIFZpZXcge1xuICBhZGRDb3N0ID0gMDtcblxuICBhZGRpdGl2ZXMgPSBuZXcgTWFwKCk7XG5cbiAgdG90YWxOb2RlID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihjYXJkUGFyYW1zKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgdGFnOiAnYXJ0aWNsZScsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZCddLFxuICAgICAgY2FsbGJhY2s6IChlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpLFxuICAgIH07XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgICB0aGlzLmRlZmF1bFByaWNlID0gK2NhcmRQYXJhbXMucHJpY2U7XG4gICAgdGhpcy5jb25maWd1cmVWaWV3KGNhcmRQYXJhbXMpO1xuICB9XG5cbiAgY29uZmlndXJlVmlldyhjYXJkUGFyYW1zKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAnZGl2JyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX19pbWFnZSddLFxuICAgIH0pO1xuICAgIGNvbnN0IGltYWdlQ29udGFpbmVyID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fY29udGFpbmVyJ10sXG4gICAgfSk7XG4gICAgaW1hZ2VDb250YWluZXIuYWRkSW5uZXJOb2RlKGltYWdlKTtcbiAgICBpbWFnZS5nZXROb2RlKCkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtjYXJkUGFyYW1zLmltYWdlfScpYDtcbiAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5jcmVhdGVEZXRhaWxzKGNhcmRQYXJhbXMpO1xuICAgIHRoaXMudmlld05vZGUuYWRkSW5uZXJOb2RlKGltYWdlQ29udGFpbmVyLCBkZXRhaWxzKTtcbiAgICB0aGlzLnNob3dNb2RhbCgpO1xuICB9XG5cbiAgY3JlYXRlRGV0YWlscyhjYXJkUGFyYW1zKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2RldGFpbHMnXSxcbiAgICB9KTtcbiAgICBjb25zdCB0aXRsZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdoNCcsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fdGl0bGUnXSxcbiAgICAgIHRleHQ6IGNhcmRQYXJhbXMubmFtZSxcbiAgICB9KTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdoNCcsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fZGVzY3JpcHRpb24nXSxcbiAgICAgIHRleHQ6IGNhcmRQYXJhbXMuZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gICAgY29uc3Qgc2l6ZVNlbGVjdG9yID0gdGhpcy5jcmVhdGVTaXplU2VsZWN0b3IoY2FyZFBhcmFtcyk7XG4gICAgY29uc3QgYWRkaXRpdmVzU2VsZWN0b3IgPSB0aGlzLmNyZWF0ZUFkZGl0aXZlc1NlbGVjdG9yKGNhcmRQYXJhbXMpO1xuICAgIGNvbnN0IHRvdGFsUHJpY2UgPSBuZXcgTm9kZUNyZWF0b3Ioe1xuICAgICAgdGFnOiAncCcsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fcHJpY2UnXSxcbiAgICB9KTtcbiAgICB0aGlzLnRvdGFsTm9kZSA9IHRvdGFsUHJpY2U7XG4gICAgY29uc3Qgd2FybmluZyA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdwJyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX193YXJuaW5nJ10sXG4gICAgICB0ZXh0OiB3YXJuaW5nVGV4dCxcbiAgICB9KTtcbiAgICBjb25zdCBjbG9zZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2Nsb3NlJ10sXG4gICAgICB0ZXh0OiAnQ2xvc2UnLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuY2xvc2VNb2RhbCgpLFxuICAgIH0pO1xuICAgIGRldGFpbHMuYWRkSW5uZXJOb2RlKFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHNpemVTZWxlY3RvcixcbiAgICAgIGFkZGl0aXZlc1NlbGVjdG9yLFxuICAgICAgdG90YWxQcmljZSxcbiAgICAgIHdhcm5pbmcsXG4gICAgICBjbG9zZVxuICAgICk7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbCgpO1xuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG5cbiAgY3JlYXRlU2l6ZVNlbGVjdG9yKGNhcmRQYXJhbXMpIHtcbiAgICBjb25zdCBzaXplQ29udGFpbmVyID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fc2l6ZS1zZWxlY3RvciddLFxuICAgIH0pO1xuICAgIGNvbnN0IHNpemVTdWJ0aXRsZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdwJyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX19zdWJ0aXRsZSddLFxuICAgICAgdGV4dDogJ1NpemUnLFxuICAgIH0pO1xuICAgIGNvbnN0IGJ0bkNvbnRhaW5lciA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2J1dHRvbi1jb250YWluZXInLCAnc2l6ZV9fYnV0dG9uLWNvbnRhaW5lciddLFxuICAgIH0pO1xuICAgIGNvbnN0IGJ0bnMgPSBPYmplY3QudmFsdWVzKGNhcmRQYXJhbXMuc2l6ZXMpLm1hcCgoaW5mbykgPT4ge1xuICAgICAgY29uc3QgYnV0dG9uID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2J1dHRvbiddLFxuICAgICAgICB0ZXh0OiBpbmZvLnNpemUsXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRDb3N0ID0gK2luZm9bJ2FkZC1wcmljZSddO1xuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWwoKTtcbiAgICAgICAgICBidG5zLmZvckVhY2goKGJ0bikgPT4gYnRuLnNldENsYXNzTmFtZXMoWydtb2RhbC1jYXJkX19idXR0b24nXSkpO1xuICAgICAgICAgIGJ1dHRvbi5zZXRDbGFzc05hbWVzKFsnbW9kYWwtY2FyZF9fYnV0dG9uJywgJ21vZGFsLWNhcmRfX2J1dHRvbl9zZWxlY3RlZCddKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9KTtcbiAgICBidG5zWzBdLnNldENsYXNzTmFtZXMoWydtb2RhbC1jYXJkX19idXR0b24nLCAnbW9kYWwtY2FyZF9fYnV0dG9uX3NlbGVjdGVkJ10pO1xuICAgIGJ0bkNvbnRhaW5lci5hZGRJbm5lck5vZGUoLi4uYnRucyk7XG4gICAgc2l6ZUNvbnRhaW5lci5hZGRJbm5lck5vZGUoc2l6ZVN1YnRpdGxlLCBidG5Db250YWluZXIpO1xuICAgIHJldHVybiBzaXplQ29udGFpbmVyO1xuICB9XG5cbiAgY3JlYXRlQWRkaXRpdmVzU2VsZWN0b3IoY2FyZFBhcmFtcykge1xuICAgIGNvbnN0IGFkZGl0aXZlc0NvbnRhaW5lciA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY3NzOiBbJ21vZGFsLWNhcmRfX2FkZGl0aXZlcy1zZWxlY3RvciddLFxuICAgIH0pO1xuICAgIGNvbnN0IHNpemVTdWJ0aXRsZSA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICB0YWc6ICdwJyxcbiAgICAgIGNzczogWydtb2RhbC1jYXJkX19zdWJ0aXRsZSddLFxuICAgICAgdGV4dDogJ0FkZGl0aXZlcycsXG4gICAgfSk7XG4gICAgY29uc3QgYnRuQ29udGFpbmVyID0gbmV3IE5vZGVDcmVhdG9yKHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjc3M6IFsnbW9kYWwtY2FyZF9fYnV0dG9uLWNvbnRhaW5lcicsICdhZGRpdGl2ZV9fYnV0dG9uLWNvbnRhaW5lciddLFxuICAgIH0pO1xuICAgIGNvbnN0IGJ0bnMgPSBbLi4uY2FyZFBhcmFtcy5hZGRpdGl2ZXNdLm1hcCgoaW5mbywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IG5ldyBOb2RlQ3JlYXRvcih7XG4gICAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICAgIGNzczogWydtb2RhbC1jYXJkX19idXR0b24nXSxcbiAgICAgICAgdGV4dDogaW5mby5uYW1lLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmFkZGl0aXZlcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZGl0aXZlcy5kZWxldGUoaW5kZXgpO1xuICAgICAgICAgICAgYnV0dG9uLnNldENsYXNzTmFtZXMoWydtb2RhbC1jYXJkX19idXR0b24nXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkaXRpdmVzLnNldChpbmRleCwgK2luZm9bJ2FkZC1wcmljZSddKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRDbGFzc05hbWVzKFsnbW9kYWwtY2FyZF9fYnV0dG9uJywgJ21vZGFsLWNhcmRfX2J1dHRvbl9zZWxlY3RlZCddKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbCgpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH0pO1xuICAgIGJ0bkNvbnRhaW5lci5hZGRJbm5lck5vZGUoLi4uYnRucyk7XG4gICAgYWRkaXRpdmVzQ29udGFpbmVyLmFkZElubmVyTm9kZShzaXplU3VidGl0bGUsIGJ0bkNvbnRhaW5lcik7XG4gICAgcmV0dXJuIGFkZGl0aXZlc0NvbnRhaW5lcjtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRvdGFsKCkge1xuICAgIGNvbnN0IGZpbmFsQ29zdCA9XG4gICAgICB0aGlzLmRlZmF1bFByaWNlICsgdGhpcy5hZGRDb3N0ICsgWy4uLnRoaXMuYWRkaXRpdmVzLnZhbHVlcygpXS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgICB0aGlzLnRvdGFsTm9kZS5zZXRUZXh0Q29udGVudChcbiAgICAgIGAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICBjdXJyZW5jeTogJ1VTRCcsXG4gICAgICB9KS5mb3JtYXQoZmluYWxDb3N0KX1gXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IGNvZmZlZTEgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvY29mZmVlL2NvZmZlZS0xLmpwZyc7XG5pbXBvcnQgY29mZmVlMiBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9jb2ZmZWUvY29mZmVlLTIuanBnJztcbmltcG9ydCBjb2ZmZWUzIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2NvZmZlZS9jb2ZmZWUtMy5qcGcnO1xuaW1wb3J0IGNvZmZlZTQgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvY29mZmVlL2NvZmZlZS00LmpwZyc7XG5pbXBvcnQgY29mZmVlNSBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9jb2ZmZWUvY29mZmVlLTUuanBnJztcbmltcG9ydCBjb2ZmZWU2IGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2NvZmZlZS9jb2ZmZWUtNi5qcGcnO1xuaW1wb3J0IGNvZmZlZTcgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvY29mZmVlL2NvZmZlZS03LmpwZyc7XG5pbXBvcnQgY29mZmVlOCBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9jb2ZmZWUvY29mZmVlLTguanBnJztcblxuaW1wb3J0IHRlYTEgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvdGVhL3RlYS0xLnBuZyc7XG5pbXBvcnQgdGVhMiBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS90ZWEvdGVhLTIucG5nJztcbmltcG9ydCB0ZWEzIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L3RlYS90ZWEtMy5wbmcnO1xuaW1wb3J0IHRlYTQgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvdGVhL3RlYS00LnBuZyc7XG5cbmltcG9ydCBkZXNzZXJ0MSBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9kZXNzZXJ0L2Rlc3NlcnQtMS5wbmcnO1xuaW1wb3J0IGRlc3NlcnQyIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2Rlc3NlcnQvZGVzc2VydC0yLnBuZyc7XG5pbXBvcnQgZGVzc2VydDMgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvZGVzc2VydC9kZXNzZXJ0LTMucG5nJztcbmltcG9ydCBkZXNzZXJ0NCBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9kZXNzZXJ0L2Rlc3NlcnQtNC5wbmcnO1xuaW1wb3J0IGRlc3NlcnQ1IGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2Rlc3NlcnQvZGVzc2VydC01LnBuZyc7XG5pbXBvcnQgZGVzc2VydDYgZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlL21lbnUvZGVzc2VydC9kZXNzZXJ0LTYucG5nJztcbmltcG9ydCBkZXNzZXJ0NyBmcm9tICcuLi8uLi9hc3NldHMvaW1hZ2UvbWVudS9kZXNzZXJ0L2Rlc3NlcnQtNy5wbmcnO1xuaW1wb3J0IGRlc3NlcnQ4IGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZS9tZW51L2Rlc3NlcnQvZGVzc2VydC04LnBuZyc7XG5cbmNvbnN0IG1lbnVEYXRhID0gW1xuICB7XG4gICAgbmFtZTogJ0lyaXNoIGNvZmZlZScsXG4gICAgZGVzY3JpcHRpb246ICdGcmFncmFudCBibGFjayBjb2ZmZWUgd2l0aCBKYW1lc29uIElyaXNoIHdoaXNrZXkgYW5kIHdoaXBwZWQgbWlsaycsXG4gICAgcHJpY2U6ICc3LjAwJyxcbiAgICBjYXRlZ29yeTogJ2NvZmZlZScsXG4gICAgaW1hZ2U6IGNvZmZlZTEsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMzAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICc0MDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VnYXInLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0Npbm5hbW9uJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTeXJ1cCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdLYWhsdWEgY29mZmVlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0NsYXNzaWMgY29mZmVlIHdpdGggbWlsayBhbmQgS2FobHVhIGxpcXVldXIgdW5kZXIgYSBjYXAgb2YgZnJvdGhlZCBtaWxrJyxcbiAgICBwcmljZTogJzcuMDAnLFxuICAgIGNhdGVnb3J5OiAnY29mZmVlJyxcbiAgICBpbWFnZTogY29mZmVlMixcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2lubmFtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0hvbmV5IHJhZicsXG4gICAgZGVzY3JpcHRpb246ICdFc3ByZXNzbyB3aXRoIGZyb3RoZWQgbWlsaywgY3JlYW0gYW5kIGFyb21hdGljIGhvbmV5JyxcbiAgICBwcmljZTogJzUuNTAnLFxuICAgIGNhdGVnb3J5OiAnY29mZmVlJyxcbiAgICBpbWFnZTogY29mZmVlMyxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2lubmFtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0ljZSBjYXBwdWNjaW5vJyxcbiAgICBkZXNjcmlwdGlvbjogJ0NhcHB1Y2Npbm8gd2l0aCBzb2Z0IHRoaWNrIGZvYW0gaW4gc3VtbWVyIHZlcnNpb24gd2l0aCBpY2UnLFxuICAgIHByaWNlOiAnNS4wMCcsXG4gICAgY2F0ZWdvcnk6ICdjb2ZmZWUnLFxuICAgIGltYWdlOiBjb2ZmZWU0LFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICcyMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzMwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnNDAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1Z2FyJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdDaW5uYW1vbicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3lydXAnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnRXNwcmVzc28nLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2xhc3NpYyBibGFjayBjb2ZmZWUnLFxuICAgIHByaWNlOiAnNC41MCcsXG4gICAgY2F0ZWdvcnk6ICdjb2ZmZWUnLFxuICAgIGltYWdlOiBjb2ZmZWU1LFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICcyMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzMwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnNDAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1Z2FyJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdDaW5uYW1vbicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3lydXAnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnTGF0dGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnRXNwcmVzc28gY29mZmVlIHdpdGggdGhlIGFkZGl0aW9uIG9mIHN0ZWFtZWQgbWlsayBhbmQgZGVuc2UgbWlsayBmb2FtJyxcbiAgICBwcmljZTogJzUuNTAnLFxuICAgIGNhdGVnb3J5OiAnY29mZmVlJyxcbiAgICBpbWFnZTogY29mZmVlNixcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2lubmFtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0xhdHRlIG1hY2NoaWF0bycsXG4gICAgZGVzY3JpcHRpb246ICdFc3ByZXNzbyB3aXRoIGZyb3RoZWQgbWlsayBhbmQgY2hvY29sYXRlJyxcbiAgICBwcmljZTogJzUuNTAnLFxuICAgIGNhdGVnb3J5OiAnY29mZmVlJyxcbiAgICBpbWFnZTogY29mZmVlNyxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2lubmFtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0NvZmZlZSB3aXRoIGNvZ25hYycsXG4gICAgZGVzY3JpcHRpb246ICdGcmFncmFudCBibGFjayBjb2ZmZWUgd2l0aCBjb2duYWMgYW5kIHdoaXBwZWQgY3JlYW0nLFxuICAgIHByaWNlOiAnNi41MCcsXG4gICAgY2F0ZWdvcnk6ICdjb2ZmZWUnLFxuICAgIGltYWdlOiBjb2ZmZWU4LFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICcyMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzMwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnNDAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1Z2FyJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdDaW5uYW1vbicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3lydXAnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnTW9yb2NjYW4nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0ZyYWdyYW50IGJsYWNrIHRlYSB3aXRoIHRoZSBhZGRpdGlvbiBvZiB0YW5nZXJpbmUsIGNpbm5hbW9uLCBob25leSwgbGVtb24gYW5kIG1pbnQnLFxuICAgIHByaWNlOiAnNC41MCcsXG4gICAgY2F0ZWdvcnk6ICd0ZWEnLFxuICAgIGltYWdlOiB0ZWExLFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICcyMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzMwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnNDAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1Z2FyJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdMZW1vbicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3lydXAnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnR2luZ2VyJyxcbiAgICBkZXNjcmlwdGlvbjogJ09yaWdpbmFsIGJsYWNrIHRlYSB3aXRoIGZyZXNoIGdpbmdlciwgbGVtb24gYW5kIGhvbmV5JyxcbiAgICBwcmljZTogJzUuMDAnLFxuICAgIGNhdGVnb3J5OiAndGVhJyxcbiAgICBpbWFnZTogdGVhMixcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnMjAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICczMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzQwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdWdhcicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTGVtb24nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N5cnVwJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0NyYW5iZXJyeScsXG4gICAgZGVzY3JpcHRpb246ICdJbnZpZ29yYXRpbmcgYmxhY2sgdGVhIHdpdGggY3JhbmJlcnJ5IGFuZCBob25leScsXG4gICAgcHJpY2U6ICc1LjAwJyxcbiAgICBjYXRlZ29yeTogJ3RlYScsXG4gICAgaW1hZ2U6IHRlYTMsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMzAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICc0MDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VnYXInLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0xlbW9uJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTeXJ1cCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdTZWEgYnVja3Rob3JuJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RvbmluZyBzd2VldCBibGFjayB0ZWEgd2l0aCBzZWEgYnVja3Rob3JuLCBmcmVzaCB0aHltZSBhbmQgY2lubmFtb24nLFxuICAgIHByaWNlOiAnNS41MCcsXG4gICAgY2F0ZWdvcnk6ICd0ZWEnLFxuICAgIGltYWdlOiB0ZWE0LFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICcyMDAgbWwnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzMwMCBtbCcsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnNDAwIG1sJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1Z2FyJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdMZW1vbicsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3lydXAnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnTWFyYmxlIGNoZWVzZWNha2UnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGhpbGFkZWxwaGlhIGNoZWVzZSB3aXRoIGxlbW9uIHplc3Qgb24gYSBsaWdodCBzcG9uZ2UgY2FrZSBhbmQgcmVkIGN1cnJhbnQgamFtJyxcbiAgICBwcmljZTogJzMuNTAnLFxuICAgIGNhdGVnb3J5OiAnZGVzc2VydCcsXG4gICAgaW1hZ2U6IGRlc3NlcnQxLFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICc1MCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICcxMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnMjAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnQmVycmllcycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTnV0cycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnSmFtJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ1JlZCB2ZWx2ZXQnLFxuICAgIGRlc2NyaXB0aW9uOiAnTGF5ZXIgY2FrZSB3aXRoIGNyZWFtIGNoZWVzZSBmcm9zdGluZycsXG4gICAgcHJpY2U6ICc0LjAwJyxcbiAgICBjYXRlZ29yeTogJ2Rlc3NlcnQnLFxuICAgIGltYWdlOiBkZXNzZXJ0MixcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnNTAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMTAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JlcnJpZXMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ051dHMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0phbScsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdDaGVlc2VjYWtlcycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnU29mdCBjb3R0YWdlIGNoZWVzZSBwYW5jYWtlcyB3aXRoIHNvdXIgY3JlYW0gYW5kIGZyZXNoIGJlcnJpZXMgYW5kIHNwcmlua2xlZCB3aXRoIHBvd2RlcmVkIHN1Z2FyJyxcbiAgICBwcmljZTogJzQuNTAnLFxuICAgIGNhdGVnb3J5OiAnZGVzc2VydCcsXG4gICAgaW1hZ2U6IGRlc3NlcnQzLFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICc1MCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICcxMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnMjAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnQmVycmllcycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTnV0cycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnSmFtJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0NyZW1lIGJydWxlZScsXG4gICAgZGVzY3JpcHRpb246ICdEZWxpY2F0ZSBjcmVhbXkgZGVzc2VydCBpbiBhIGNhcmFtZWwgYmFza2V0IHdpdGggd2lsZCBiZXJyaWVzJyxcbiAgICBwcmljZTogJzQuMDAnLFxuICAgIGNhdGVnb3J5OiAnZGVzc2VydCcsXG4gICAgaW1hZ2U6IGRlc3NlcnQ0LFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICc1MCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICcxMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnMjAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnQmVycmllcycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTnV0cycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnSmFtJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ1BhbmNha2VzJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RlbmRlciBwYW5jYWtlcyB3aXRoIHN0cmF3YmVycnkgamFtIGFuZCBmcmVzaCBzdHJhd2JlcnJpZXMnLFxuICAgIHByaWNlOiAnNC41MCcsXG4gICAgY2F0ZWdvcnk6ICdkZXNzZXJ0JyxcbiAgICBpbWFnZTogZGVzc2VydDUsXG4gICAgc2l6ZXM6IHtcbiAgICAgIHM6IHtcbiAgICAgICAgc2l6ZTogJzUwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuMDAnLFxuICAgICAgfSxcbiAgICAgIG06IHtcbiAgICAgICAgc2l6ZTogJzEwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICBsOiB7XG4gICAgICAgIHNpemU6ICcyMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMS4wMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYWRkaXRpdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdCZXJyaWVzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdOdXRzJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdKYW0nLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiAnSG9uZXkgY2FrZScsXG4gICAgZGVzY3JpcHRpb246ICdDbGFzc2ljIGhvbmV5IGNha2Ugd2l0aCBkZWxpY2F0ZSBjdXN0YXJkJyxcbiAgICBwcmljZTogJzQuNTAnLFxuICAgIGNhdGVnb3J5OiAnZGVzc2VydCcsXG4gICAgaW1hZ2U6IGRlc3NlcnQ2LFxuICAgIHNpemVzOiB7XG4gICAgICBzOiB7XG4gICAgICAgIHNpemU6ICc1MCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjAwJyxcbiAgICAgIH0sXG4gICAgICBtOiB7XG4gICAgICAgIHNpemU6ICcxMDAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAgbDoge1xuICAgICAgICBzaXplOiAnMjAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzEuMDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFkZGl0aXZlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnQmVycmllcycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTnV0cycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnSmFtJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcwLjUwJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogJ0Nob2NvbGF0ZSBjYWtlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Nha2Ugd2l0aCBob3QgY2hvY29sYXRlIGZpbGxpbmcgYW5kIG51dHMgd2l0aCBkcmllZCBhcHJpY290cycsXG4gICAgcHJpY2U6ICc1LjUwJyxcbiAgICBjYXRlZ29yeTogJ2Rlc3NlcnQnLFxuICAgIGltYWdlOiBkZXNzZXJ0NyxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnNTAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMTAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JlcnJpZXMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ051dHMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0phbScsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6ICdCbGFjayBmb3Jlc3QnLFxuICAgIGRlc2NyaXB0aW9uOiAnQSBjb21iaW5hdGlvbiBvZiB0aGluIHNwb25nZSBjYWtlIHdpdGggY2hlcnJ5IGphbSBhbmQgbGlnaHQgY2hvY29sYXRlIG1vdXNzZScsXG4gICAgcHJpY2U6ICc2LjUwJyxcbiAgICBjYXRlZ29yeTogJ2Rlc3NlcnQnLFxuICAgIGltYWdlOiBkZXNzZXJ0OCxcbiAgICBzaXplczoge1xuICAgICAgczoge1xuICAgICAgICBzaXplOiAnNTAgZycsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC4wMCcsXG4gICAgICB9LFxuICAgICAgbToge1xuICAgICAgICBzaXplOiAnMTAwIGcnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIGw6IHtcbiAgICAgICAgc2l6ZTogJzIwMCBnJyxcbiAgICAgICAgJ2FkZC1wcmljZSc6ICcxLjAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhZGRpdGl2ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JlcnJpZXMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ051dHMnLFxuICAgICAgICAnYWRkLXByaWNlJzogJzAuNTAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0phbScsXG4gICAgICAgICdhZGQtcHJpY2UnOiAnMC41MCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBtZW51RGF0YTtcbiIsImNvbnN0IHJlZnJlc2ggPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCI+XG48cGF0aCBkPVwiTTIxLjg4ODMgMTMuNUMyMS4xNjQ1IDE4LjMxMTMgMTcuMDEzIDIyIDEyIDIyQzYuNDc3MTUgMjIgMiAxNy41MjI4IDIgMTJDMiA2LjQ3NzE1IDYuNDc3MTUgMiAxMiAyQzE2LjEwMDYgMiAxOS42MjQ4IDQuNDY4MTkgMjEuMTY3OSA4XCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbjxwYXRoIGQ9XCJNMTcgOEgyMS40QzIxLjczMTQgOCAyMiA3LjczMTM3IDIyIDcuNFYzXCIgc3Ryb2tlPVwiIzQwM0YzRFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbjwvc3ZnPmA7XG5cbmV4cG9ydCBkZWZhdWx0IHJlZnJlc2g7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vbWVudS5zY3NzJztcbmltcG9ydCBDYXRlZ29yaWVzVmlldyBmcm9tICcuLi9qcy9tZW51L0NhdGVnb3JpZXNWaWV3JztcbmltcG9ydCBCdXJnZXJWaWV3IGZyb20gJy4uL2pzL2J1cmdlci9CdXJnZXInO1xuXG5jb25zdCBhcHAgPSBuZXcgQ2F0ZWdvcmllc1ZpZXcoKTtcbmNvbnN0IGJ1cmdlciA9IG5ldyBCdXJnZXJWaWV3KGZhbHNlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==