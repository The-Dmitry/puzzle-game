import { MessagePayload } from '../MessagePayload';

export type MessageResponse = {
  id: string | null;
  type: 'MSG_SEND';
  payload: {
    message: MessagePayload;
  };
};
