import SocketResponse from '../../../interfaces/SocketResponse';
import { PayloadsTypes } from '../../../types/PayloadTypes';

interface Params {
  appLogin: string;
  appPassword: string;
  unhandledResponse: SocketResponse<PayloadsTypes>;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
