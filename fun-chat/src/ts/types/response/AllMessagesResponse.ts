import { MessagePayload } from '../MessagePayload';

export type AllMessagesResponse = {
  id: string;
  type: 'MSG_FROM_USER';
  payload: {
    messages: MessagePayload[];
  };
};
