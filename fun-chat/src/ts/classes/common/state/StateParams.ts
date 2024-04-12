import { ResponsesList } from '../../../types/response/ResponsesList';

interface Params {
  appLogin: string;
  appPassword: string;
  unhandledResponse: ResponsesList;
  logout: boolean;
  isWsActive: boolean;
  onReadMessage: string;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
