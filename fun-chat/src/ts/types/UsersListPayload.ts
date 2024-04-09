import { ErrorPayload } from './ErrorPayload';

export type PayloadUser = { login: string; isLogined: boolean };

export type UsersListPayload =
  | {
      users: PayloadUser[];
    }
  | ErrorPayload;
