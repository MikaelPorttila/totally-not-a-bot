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
  devOnly?: boolean;
  options?: ApplicationCommandOption[];
  execute: (bot: Bot, interaction: Interaction) => unknown;
}
