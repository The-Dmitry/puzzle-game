import InputNodeParams from '../../../interfaces/InputNodeParams';
import NodeCreator from './NodeCreator';

export default class InputNodeCreator<
  T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
> extends NodeCreator<T> {
  constructor(params: InputNodeParams<T>) {
    super(params);
    this.setType(params.type);
    this.setPlaceholder(params.placeholder);
  }

  private setType(type: InputNodeParams['type']) {
    if (this.node instanceof HTMLInputElement && type) {
      this.node.type = type;
    }
  }

  public setPlaceholder(placeholder: InputNodeParams['placeholder']) {
    if (this.node instanceof HTMLInputElement && placeholder) {
      this.node.setAttribute('placeholder', placeholder);
    }
  }
}
