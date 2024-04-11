import { UserPayload } from '../UserPayload';

export type ExternalAuthResponse = {
  type: 'USER_EXTERNAL_LOGIN' | 'USER_EXTERNAL_LOGOUT';
  id: null;
  payload: {
    user: UserPayload;
  };
};
