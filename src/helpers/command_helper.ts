import { bot } from "../bot.ts";
import type { Command } from "../types/commands.ts";

export function createCommand(command: Command) {
  bot.commands.set(command.name, command);
  console.log("[Bot]", "registered", command.name, "command");
}
