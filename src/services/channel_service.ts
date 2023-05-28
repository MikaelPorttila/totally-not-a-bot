import type { Attachment, Bot, BigString } from "../../deps.ts";
import { getMessages } from "../../deps.ts";

export async function getFirstAttachment(
  bot?: Bot,
  channelId?: bigint,
): Promise<Attachment | undefined> {
  if (!bot) {
    return;
  }

  if (!channelId) {
    return;
  }

  const messages = await getMessages(bot, channelId, { limit: 10 });
  for (const [_, message] of messages) {
    const attachment = message?.attachments?.[0];
    if (attachment) {
      return attachment;
    }
  }
}

export async function findChannelIdByName(channelName: string, guildId: BigString, bot: Bot,): Promise<bigint | null> {
  for (const [_, channel] of await bot.helpers.getChannels(guildId)) {
    if (channel.name?.toLocaleLowerCase() === channelName) {
        return channel.id;
    }
  }

  return null;
}