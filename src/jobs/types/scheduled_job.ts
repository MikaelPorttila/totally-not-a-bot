import type { Bot } from "../../../deps.ts";

export interface ScheduledJob {
  name: string;
  description?: string;
  schedule: string;
  prerequisites: () => boolean;
  execute: (bot: Bot) => Promise<unknown>;
}
