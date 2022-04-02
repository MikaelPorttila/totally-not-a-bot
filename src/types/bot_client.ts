import type { Bot, Collection } from "../../deps.ts";

export interface BotClient extends Bot {
  commands: Collection<unknown, unknown>;
}
