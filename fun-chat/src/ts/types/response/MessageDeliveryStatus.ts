export type MessageDeliveryStatus = {
  id: null;
  type: 'MSG_DELIVER';
  payload: {
    message: {
      id: string;
      status: {
        isDelivered: boolean;
      };
    };
  };
};
