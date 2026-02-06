export enum QQOpCode {
  DISPATCH = 0,
  HEARTBEAT = 1,
  IDENTIFY = 2,
  RESUME = 6,
  RECONNECT = 7,
  INVALID_SESSION = 9,
  HELLO = 10,
  HEARTBEAT_ACK = 11,
  HTTP_CALLBACK_ACK = 12,
  CALLBACK_VALIDATION = 13 // Used for Webhook Validation
}

export interface QQPayload<T = any> {
  op: QQOpCode;
  d?: T;
  s?: number;
  t?: string;
  id?: string;
}

export interface QQUser {
  id: string;
  username: string;
  avatar?: string;
  bot?: boolean;
}

export interface QQMember {
  user: QQUser;
  nick?: string;
  roles?: string[];
  joined_at: string;
}
