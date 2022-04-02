import type { Bot, Message } from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import { addReaction } from "../../deps.ts";
import { EmojiService } from "../services/mod.ts";

export function createHandler(emojiService: EmojiService): MessageHandler {
  const trigger = "epi";

  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageContent: string
  ) {
    if (normalizedMessageContent.indexOf(trigger) === -1) {
      return;
    }

    console.log("[Name Message Handle] triggered");
    const epiReactionEmoji = emojiService.getReactionName("epi");
    if (epiReactionEmoji) {
      await addReaction(bot, message.channelId, message.id, epiReactionEmoji);
    }
  };
}
