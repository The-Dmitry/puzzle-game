import { UserPayload } from '../UserPayload';

export type AllUsersResponse = {
  id: string;
  type: 'USER_ACTIVE' | 'USER_INACTIVE';
  payload: {
    users: UserPayload[];
  };
};
