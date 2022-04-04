import type { Bot, Collection, Emoji } from "../../deps.ts";
import type { Command } from "./commands.ts";

export interface BotClient extends Bot {
  commands: Collection<string, Command>;
  emojis: Collection<bigint, Emoji>;
}
