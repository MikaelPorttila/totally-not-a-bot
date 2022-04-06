import {
    ApplicationCommandTypes,
    InteractionResponseTypes,
    getMessages,
    sendMessage
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
            if (attachment && isImage(attachment.contentType)) {
              const processImage = getImageText(attachment.proxyUrl);
              await bot.helpers.sendInteractionResponse(
                interaction.id,
                interaction.token,
                {
                  type: InteractionResponseTypes.ChannelMessageWithSource,
                  data: { content: '🤖 Analyserar pixlarna... här har du en äggplanta medans: 🍆' },
                },
              );

              const imageText = await processImage;
              await sendMessage(bot, interaction.channelId, {content: `Text: ${imageText}`});
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
  