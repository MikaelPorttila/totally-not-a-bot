import { addReaction, sendMessage } from "../../deps.ts";
import type { Bot, Message } from "../../deps.ts";
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
    {
      for: ["bror", "bruh", "bro", "brother", "broder"],
      reply: "What's up?",
    },
    {
      for: ["namn"],
      reply: "Samma efternamn",
    },
  ];

  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageWords: string[],
  ) {
    for (const group of reactionTable) {
      if (
        group.for.some((term) => normalizedMessageWords.some((x) => x === term))
      ) {
        try {
          if (group.reaction) {
            await addReaction(
              bot,
              message.channelId,
              message.id,
              group.reaction,
            );
          }

          if (group.reply) {
            await sendMessage(
              bot,
              message.channelId,
              {
                content: group.reply,
                messageReference: {
                  channelId: message.channelId,
                  guildId: message.guildId,
                  messageId: message.id,
                  failIfNotExists: false,
                },
              },
            );
          }
        } catch (err) {
          console.error("[Reaction Handler]", err);
        }
      }
    }
  };
}
