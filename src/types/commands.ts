import type {
  ApplicationCommandOption,
  ApplicationCommandTypes,
  Bot,
  Interaction,
} from "../../deps.ts";

export interface Command {
  name: string;
  description: string;
  type: ApplicationCommandTypes;
  options?: ApplicationCommandOption[];
  execute: (bot: Bot, interaction: Interaction) => Promise<unknown>;
}
