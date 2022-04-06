import {
    ApplicationCommandTypes,
    InteractionResponseTypes,
    getMessages
  } from "../../deps.ts";
  import type { Bot, Interaction } from "../../deps.ts";
  import { createCommand } from "../helpers/command_helper.ts";
import { isImage } from "../helpers/file_helper.ts";
import { getImageText } from "../services/ocr_service.ts";
  
  export function registerCommand() {
    createCommand({
      name: "image-to-text",
      description: "Image to text",
      type: ApplicationCommandTypes.ChatInput,
      execute: async (bot: Bot, interaction: Interaction) => {
        if (interaction?.channelId) {
            const messages = await getMessages(
                bot,
                interaction?.channelId,
                { limit: 1 }
            );
            const attachment = messages?.[0]?.attachments?.[0];
            console.log(attachment);
            if (attachment && isImage(attachment.contentType)) {
              console.log('Starting ocr scan...');
              const content = await getImageText(attachment.proxyUrl);
              console.log('Starting ocr completed');
              console.log(content);
              await bot.helpers.sendInteractionResponse(
                interaction.id,
                interaction.token,
                {
                  type: InteractionResponseTypes.ChannelMessageWithSource,
                  data: { content },
                },
              );
            } else {
              await bot.helpers.sendInteractionResponse(
                interaction.id,
                interaction.token,
                {
                  type: InteractionResponseTypes.ChannelMessageWithSource,
                  data: {
                    content: 'No img, no text for yooou 🙈'
                  },
                },
            );
            }
        }
      },
    });
  }
  