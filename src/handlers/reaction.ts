import { addReaction, Bot, Message } from "../../deps.ts";
import { EmojiService } from "../services/mod.ts";
import { MessageHandler } from "./types/mod.ts";

export function createHandler(emojiService: EmojiService): MessageHandler {
  const reactionTable = [
    {
      for: ["micke", "mikael", "sture"],
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
    normalizedMessageWords: string[]
  ) {
    for (const group of reactionTable) {
      if (
        group.reaction &&
        group.for.some((term) => normalizedMessageWords.some(x => x === term))
      ) {
        try {
          await addReaction(
            bot,
            message.channelId,
            message.id,
            group.reaction,
          );
        } catch (err) {
          console.error("[Reaction Handler]", err);
        }
      }
    }
  };
}
