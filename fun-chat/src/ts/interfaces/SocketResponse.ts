import { PayloadsTypes } from '../types/PayloadTypes';
import { SocketResponseType } from '../types/SocketResponseType';

export default interface SocketResponse<T extends PayloadsTypes> {
  id: string | null;
  type: SocketResponseType;
  payload: T;
}
