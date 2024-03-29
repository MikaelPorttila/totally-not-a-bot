import type { Bot, Message } from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import { addReaction } from "../../deps.ts";
import { getEmojiReactionName } from "../services/emoji_service.ts";
import { replyToMessage } from "../services/mod.ts";
import { log, logError } from "../services/log_helper.ts";

interface ReactionEntry {
  for: string[],
  reaction?: string;
  reply?: string;
}

export function createHandler(): MessageHandler {
  const reactionTable: ReactionEntry[] = [
    {
      for: ["micke", "mikael", "sture"],
      reaction: getEmojiReactionName("intplus"),
    },
    {
      for: ["epi"],
      reaction: getEmojiReactionName("epi"),
    },
    {
      for: ["bror", "bruh", "brother", "broder", "veli", "brur"],
      reaction: "👀",
    },
    {
      for: ['ulf', 'kristersson', 'uffe', 'moderaterna', 'm', 'moderat', 'högern'],
      reaction: getEmojiReactionName("ulfOMEGALUL")
    },
    {
      for: ['ebba', 'busch', 'kd', 'gud', 'kristdemokraterna', 'högern'],
      reaction: getEmojiReactionName("ebbaOMEGALUL")
    },
    {
      for: ['jimmie', 'jimmy','åkesson', 'jimpa', 'sd', 'sverigedemokrater', 'sverigedemokraterna', 'högern', 'utvisa', 'export'],
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
            log('Reacted with', group.reaction);
          }

          if (group.reply) {
            replyToMessage(bot, message, group.reply);
            log('replied with', group.reply);
          }
        } catch (err) {
          logError("[Reaction Handler]", err);
        }
      }
    }
  };
}
