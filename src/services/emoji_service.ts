import type { Emoji } from "../../deps.ts";
import { getReactionEmoji } from "../helpers/emoji_helper.ts";
import { bot } from "../bot.ts";

export function getEmoji(name: string): Emoji | undefined {
  if (!name) {
    return undefined;
  }

  const emoji = bot.emojis.find((emoji) => emoji.name === name);
  return emoji;
}

export function getEmojiReactionName(name: string) {
  const emoji = getEmoji(name);
  return emoji ? getReactionEmoji(emoji) : undefined;
}
