export interface QQBotConfig {
  appId: string;
  token: string;
  appSecret: string;
  sandbox?: boolean;
  shards?: number;
}

export enum QQIntents {
  GUILDS = 1 << 0,
  GUILD_MEMBERS = 1 << 1,
  GUILD_MESSAGES = 1 << 9,
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  DIRECT_MESSAGE = 1 << 12,
  GROUP_AT_MESSAGES = 1 << 25, // For group chat @bot
  PUBLIC_GUILD_MESSAGES = 1 << 30,
}
