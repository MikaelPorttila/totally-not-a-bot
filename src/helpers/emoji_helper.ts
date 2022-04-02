import type { Emoji } from "../../deps.ts";

export function getReactionEmoji(emoji?: Emoji): string | undefined {
  return emoji ? `<:${emoji.name}:${emoji.id}>` : undefined;
}
