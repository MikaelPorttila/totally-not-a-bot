import type { Bot, Message } from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import { addReaction, sendMessage } from "../../deps.ts";
import { getEmojiReactionName } from "../services/emoji_service.ts";

export function createHandler(): MessageHandler {
  const reactionTable = [
    {
      for: ["micke", "mikael", "sture"],
      reaction: getEmojiReactionName("intplus"),
    },
    {
      for: ["epi"],
      reaction: getEmojiReactionName("epi"),
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
    {
      for: ["efternamn"],
      reply: "https://youtu.be/esVuKP7k974?t=95"
    }
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
