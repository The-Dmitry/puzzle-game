export type ErrorResponse = {
  id: string;
  type: 'ERROR';
  payload: {
    error: string;
  };
};
