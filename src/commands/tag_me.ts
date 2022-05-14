import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import type { Bot } from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";

export function registerCommand() {
  createCommand({
    name: "tag-me",
    description: "Tags the message author in the reply",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (bot: Bot, interaction) => {
      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `<@${interaction.member?.id}>`,
          },
        },
      );
    },
  });
}
