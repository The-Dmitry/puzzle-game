import NodeParams from './NodeParams';

export default interface InputNodeParams extends NodeParams {
  // tag: 'input';
  type: 'text' | 'number' | 'search' | 'button' | 'text' | 'checkbox' | 'radio';
  placeholder?: string;
}
