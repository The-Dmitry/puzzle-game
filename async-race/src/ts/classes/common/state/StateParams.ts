interface Params {
  changeRoute: boolean;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
