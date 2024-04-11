import { UserPayload } from '../UserPayload';
import { ErrorResponse } from './ErrorResponse';

export type LoginResponse =
  | {
      type: 'USER_LOGIN';
      id: string;
      payload: {
        user: UserPayload;
      };
    }
  | ErrorResponse;
