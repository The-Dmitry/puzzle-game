import NodeParams from './NodeParams';

export default interface InputNodeParams<T = keyof HTMLElementTagNameMap> extends NodeParams<T> {
  type: 'text' | 'number' | 'search' | 'button' | 'text' | 'checkbox' | 'radio' | 'color';
  placeholder?: string;
}
