import { addReaction, Bot, Message } from "../../deps.ts";
import { EmojiService } from "../services/mod.ts";
import { MessageHandler } from "./types/mod.ts";

export function createHandler(emojiService: EmojiService): MessageHandler {
  const mikaelNicks = ["micke", "mikael", "sture", "eco"];

  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageContent: string,
  ) {
    if (
      mikaelNicks.some((name) => normalizedMessageContent.indexOf(name) !== -1)
    ) {
      console.log("[Name Message Handle] triggered");
      const smartGuyReactionEmoji = emojiService.getReactionName("intplus");
      if (smartGuyReactionEmoji) {
        await addReaction(
          bot,
          message.channelId,
          message.id,
          smartGuyReactionEmoji,
        );
      }
    }
  };
}
