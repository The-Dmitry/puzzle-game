export type LoginPayload =
  | {
      user: {
        login: string;
        isLogined: boolean;
      };
    }
  | {
      error: 'a user with this login is already authorized';
    };
