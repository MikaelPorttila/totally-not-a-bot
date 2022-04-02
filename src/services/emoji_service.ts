import type { Bot, Collection, Emoji } from "../../deps.ts";
import { getEmojis } from "../../deps.ts";
import { getReactionEmoji } from "../helpers/emoji_helper.ts";

export class EmojiService {
  constructor(private cache: Collection<bigint, Emoji>) {}

  get(name: string): Emoji | undefined {
    if (!name) {
      return undefined;
    }

    const emoji = this.cache.find((emoji, _) => emoji.name === name);
    return emoji;
  }

  getReactionName(name: string) {
    const emoji = this.get(name);
    return emoji ? getReactionEmoji(emoji) : undefined;
  }
}

export async function createEmojiService(
  bot: Bot,
  guildId: bigint,
): Promise<EmojiService> {
  const guildEmojis = await getEmojis(bot, guildId);
  return new EmojiService(guildEmojis);
}
