import type { Bot, Message } from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import { addReaction } from "../../deps.ts";
import { EmojiService } from "../services/mod.ts";

const trigger = "epi";
export function createHandler(emojiService: EmojiService): MessageHandler {
  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageContent: string,
  ) {
    if (normalizedMessageContent.indexOf(trigger) === -1) {
      return;
    }

    const epiReactionEmoji = emojiService.getReactionName("epi");
    if (epiReactionEmoji) {
      await addReaction(bot, message.channelId, message.id, epiReactionEmoji);
    }
  };
}
