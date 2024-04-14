import { AllMessagesResponse } from './AllMessagesResponse';
import { AllUsersResponse } from './AllUsersResponse';
import { ExternalAuthResponse } from './ExternalAuthResponse';
import { LoginResponse } from './LoginResponse';
import { LogoutResponse } from './LogoutResponse';
import { MessageDeleteResponse } from './MessageDeleteResponse';
import { MessageDeliveryStatus } from './MessageDeliveryStatus';
import { MessageResponseType } from './MessageEditResponse';
import { MessageReadStatus } from './MessageReadStatus';
import { MessageResponse } from './MessageResponse';

export type ResponsesList =
  | LoginResponse
  | LogoutResponse
  | AllMessagesResponse
  | AllUsersResponse
  | MessageResponse
  | ExternalAuthResponse
  | MessageDeliveryStatus
  | MessageReadStatus
  | MessageDeleteResponse
  | MessageResponseType;
