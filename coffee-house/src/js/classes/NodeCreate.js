export default class NodeCreator {
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
