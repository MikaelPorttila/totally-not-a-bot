import type { Collection, Emoji } from "../../deps.ts";
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
