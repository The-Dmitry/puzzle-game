export default interface NodeParams<T = keyof HTMLElementTagNameMap> {
  tag: T;
  css?: string[];
  text?: string;
  callback?: (e: Event) => void;
  id?: string;
  subscription?: () => void;
  href?: string;
}
