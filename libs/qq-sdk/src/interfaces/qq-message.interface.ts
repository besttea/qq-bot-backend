import { QQUser, QQMember } from './qq-payload.interface';

export interface QQMessageAttachment {
  url: string;
}

export interface QQMessage {
  id: string;
  channel_id: string;
  guild_id: string;
  content: string;
  timestamp: string;
  author: QQUser;
  member?: QQMember;
  attachments?: QQMessageAttachment[];
  mentions?: QQUser[];
}
