import { addReaction, Bot, Message } from "../../deps.ts";
import { EmojiService } from "../services/mod.ts";
import { MessageHandler } from "./types/mod.ts";

export function createHandler(emojiService: EmojiService): MessageHandler {
  const reactionTable = [
    {
      for: ["micke", "mikael", "sture", "eco"],
      reaction: emojiService.getReactionName("intplus"),
    },
    {
      for: ["epi"],
      reaction: emojiService.getReactionName("epi"),
    },
    {
      for: ["cod", "snarkov", "tarkov", "cs", "stridsåker", "bf"],
      reaction: "🎮",
    },
  ];

  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageContent: string,
  ) {
    for (const reactionGroup of reactionTable) {
      if (
        reactionGroup.for.some((term) =>
          normalizedMessageContent.indexOf(term) !== -1
        ) && reactionGroup.reaction
      ) {
        try {
          await addReaction(
            bot,
            message.channelId,
            message.id,
            reactionGroup.reaction,
          );
        } catch (err) {
          console.error("[Reaction Handler]", err);
        }
      }
    }
  };
}
