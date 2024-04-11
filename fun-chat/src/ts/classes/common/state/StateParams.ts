import { ResponsesList } from '../../../types/response/ResponsesList';

interface Params {
  appLogin: string;
  appPassword: string;
  unhandledResponse: ResponsesList;
  logout: boolean;
  isWsActive: boolean;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
