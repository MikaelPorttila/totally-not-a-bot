import type { Bot } from "../../../deps.ts";

export interface ScheduledJob {
  name: string;
  description?: string;
  schedule: string;
  setup: (bot: Bot) => Promise<boolean>;
  execute: (bot: Bot) => Promise<unknown>;
}
