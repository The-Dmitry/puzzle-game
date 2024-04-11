import { UserPayload } from '../UserPayload';
import { ErrorResponse } from './ErrorResponse';

export type LogoutResponse =
  | {
      type: 'USER_LOGOUT';
      id: string;
      payload: {
        user: UserPayload;
      };
    }
  | ErrorResponse;
