import type { Bot, Message } from "../../deps.ts";
import { sendMessage } from "../../deps.ts";

export async function replyToMessage(
  bot: Bot,
  message: Message,
  content?: string,
): Promise<Message> {
  const result = await sendMessage(
    bot,
    message.channelId,
    {
      content,
      messageReference: {
        channelId: message.channelId,
        guildId: message.guildId,
        messageId: message.id,
        failIfNotExists: false,
      }
    },
  );
  return result;
}
