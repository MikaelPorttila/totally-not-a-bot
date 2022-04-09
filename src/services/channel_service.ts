import type { Attachment, Bot } from "../../deps.ts";
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
  for (const message of messages) {
    const attachment = message?.attachments?.[0];
    if (attachment) {
      return attachment;
    }
  }
}
