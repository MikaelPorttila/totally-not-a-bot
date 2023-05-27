import { bot } from "../bot.ts";
import type { Command } from "../types/commands.ts";

export function createCommand(command: Command): void {
  bot.commands.set(command.name, command);
  console.log("[Bot]", "Registered", command.name, "command");
}

export function clearCommands(): void {
  bot.commands.clear();
}