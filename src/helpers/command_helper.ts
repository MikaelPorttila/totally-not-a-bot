import { bot } from "../bot.ts";
import { log } from "../services/log_helper.ts";
import type { Command } from "../types/commands.ts";

export function createCommand(command: Command): void {
  bot.commands.set(command.name, command);
  log("Registered", command.name, "command");
}

export function clearCommands(): void {
  bot.commands.clear();
}