import InputNodeParams from '../../../interfaces/InputNodeParams';
import NodeCreator from './NodeCreator';

export default class InputNodeCreator extends NodeCreator {
  constructor(params: InputNodeParams) {
    super(params);
    this.setType(params.type);
    this.setPlaceholder(params.placeholder);
  }

  private setType(type: InputNodeParams['type']) {
    if (this.node instanceof HTMLInputElement && type) {
      this.node.type = type;
    }
  }

  private setPlaceholder(placeholder: InputNodeParams['placeholder']) {
    if (this.node instanceof HTMLInputElement && placeholder) {
      this.node.setAttribute('placeholder', placeholder);
    }
  }
}
