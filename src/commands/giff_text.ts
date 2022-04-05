import {
    ApplicationCommandTypes,
    InteractionResponseTypes,
    getMessages
  } from "../../deps.ts";
  import type { Bot, Interaction } from "../../deps.ts";
  import { createCommand } from "../helpers/command_helper.ts";
  
  export function registerCommand() {
    createCommand({
      name: "giff-text",
      description: "Image to text",
      type: ApplicationCommandTypes.ChatInput,
      execute: async (bot: Bot, interaction: Interaction) => {

        if (interaction?.channelId) {
            const messages = await getMessages(
                bot,
                interaction?.channelId,
                { 
                    limit: 1
                }
            );

            const targetMessage = messages[0];

            await bot.helpers.sendInteractionResponse(
                interaction.id,
                interaction.token,
                {
                  type: InteractionResponseTypes.ChannelMessageWithSource,
                  data: {
                    content: `${targetMessage.content}, ${targetMessage.attachments?.length || 0} attachments`,
                  },
                },
            );
        }
      },
    });
  }
  