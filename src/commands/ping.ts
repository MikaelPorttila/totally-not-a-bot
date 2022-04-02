import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import type { Bot } from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";

export function registerCommand() {
  createCommand({
    name: "ping",
    description: "Hello world of commands",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (bot: Bot, interaction) => {
      console.log("[Ping Command]", "incoming interaction");
      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `Ping!`,
          },
        },
      );
    },
  });
}
