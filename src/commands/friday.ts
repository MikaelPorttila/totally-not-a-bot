import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import type { Bot, Interaction } from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";

export function registerCommand() {
  createCommand({
    name: "friday",
    description: "It's Friday!!!",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (bot: Bot, interaction: Interaction) => {
      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: 'https://www.youtube.com/watch?v=kfVsfOSbJY0',
          },
        },
      );
    },
  });
}
