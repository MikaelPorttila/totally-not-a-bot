import {
    ApplicationCommandTypes,
    InteractionResponseTypes,
    getMessages
  } from "../../deps.ts";
  import type { Bot, Interaction } from "../../deps.ts";
  import { createCommand } from "../helpers/command_helper.ts";
  
  export function registerCommand() {
    createCommand({
      name: "giff text",
      description: "Image to text",
      type: ApplicationCommandTypes.ChatInput,
      execute: async (bot: Bot, interaction: Interaction) => {

        if (interaction?.guildId) {
            const messages = await getMessages(
                bot,
                interaction?.guildId,
                { 
                    limit: 1
                }
            );

            await bot.helpers.sendInteractionResponse(
                interaction.id,
                interaction.token,
                {
                  type: InteractionResponseTypes.ChannelMessageWithSource,
                  data: {
                    content: messages[0].content,
                  },
                },
            );
        }
      },
    });
  }
  