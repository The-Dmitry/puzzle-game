import { ResponsesList } from '../../../types/response/ResponsesList';

interface Params {
  appLogin: string;
  appPassword: string;
  unhandledResponse: ResponsesList;
  logout: boolean;
  isWsActive: boolean;
  onReadMessage: string;
  editMessage: { text: string; id: string };
  toUserList: boolean;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
