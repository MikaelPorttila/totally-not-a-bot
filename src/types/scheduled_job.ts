import type { Bot } from "../../deps.ts";

export interface ScheduledJob {
    name: string;
    description?: string;
    schedule: string; 
    execute: (bot: Bot) => Promise<unknown>;
  }
  