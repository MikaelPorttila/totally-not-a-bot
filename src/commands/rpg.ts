import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import type { Bot, Interaction } from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";

export function registerCommand() {
  createCommand({
    name: "rpg",
    description: "World of Wääw, TBH...",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (bot: Bot, interaction: Interaction) => {
      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: "TBH 🤫",
          },
        },
      );
    },
  });
}
