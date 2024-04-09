import { ErrorPayload } from './ErrorPayload';

export type LoginPayload =
  | {
      user: {
        login: string;
        isLogined: boolean;
      };
    }
  | ErrorPayload;
