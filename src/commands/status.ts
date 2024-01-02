import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import type { Bot, Interaction } from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";

function formatBytes(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1);
}

export function registerCommand() {
  createCommand({
    name: "botstatus",
    description: "Display bot status",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (bot: Bot, interaction: Interaction) => {
      const memoryUsage = Deno.memoryUsage();
      const responseMessage = `Memory
      Heap: ${formatBytes(memoryUsage.heapUsed)} / ${formatBytes(memoryUsage.heapTotal)} MB
      RSS: ${formatBytes(memoryUsage.rss)} MB
      External: ${formatBytes(memoryUsage.external)} MB`

      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: responseMessage,
          },
        },
      ); 
    },
  });
}
