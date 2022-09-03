import type { Bot, Message } from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import { addReaction, sendMessage } from "../../deps.ts";
import { getEmojiReactionName } from "../services/emoji_service.ts";
import { replyToMessage } from "../services/mod.ts";

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
      reply: "efternamn",
    },
    {
      for: ["efternamn"],
      reply: "https://youtu.be/esVuKP7k974?t=95",
    },
    {
      for: ["io", "space", "inferno", "kappabar", "kappa", "matrix"],
      reply: "Äre gibb eller?! 🔥🔥🔥",
    },
    {
      for: ['ulf', 'kristersson', 'uffe', 'moderaterna', 'm', 'moderat', 'högern'],
      reaction: getEmojiReactionName("ulfOMEGALUL")
    },
    {
      for: ['ebba', 'busch', 'kd', 'gud', 'kristdemokraterna', 'högern'],
      reaction: getEmojiReactionName("ulfOMEGALUL")
    },
    {
      for: ['jimmie', 'jimmy','åkesson', 'jimpa', 'sd', 'sverigedemokrater', 'sverigedemokraterna', 'högern'],
      reaction: getEmojiReactionName("jimmieOMEGALUL")
    },
    {
      for: ['magdalena', 'sosse', 'såsse', 's', 'socialdemokrat', 'socialdemokraterna'],
      reaction: getEmojiReactionName("magdalenaOMEGALUL")
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
            replyToMessage(bot, message, group.reply);
          }
        } catch (err) {
          console.error("[Reaction Handler]", err);
        }
      }
    }
  };
}
