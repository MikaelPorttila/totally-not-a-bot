import type { Bot, Message } from "../../../deps.ts";
export type MessageHandler = (
  bot: Bot,
  message: Message,
  normalizedMessageText: string,
) => Promise<void>;
