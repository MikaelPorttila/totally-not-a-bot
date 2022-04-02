import type { Bot, Collection } from "../../deps.ts";
import type { Command } from "./commands.ts";

export interface BotClient extends Bot {
  commands: Collection<string, Command>;
}
