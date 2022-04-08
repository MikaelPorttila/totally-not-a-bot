import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import type { Bot, Interaction } from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";
import { getRandomNumber } from "../helpers/random_helper.ts";

export function registerCommand() {
  const bangerList = [
    "https://www.youtube.com/watch?v=Nntd2fgMUYw", // Save tonight
    "https://www.youtube.com/watch?v=YcXMhwF4EtQ", // All 'Bout The Money
    "https://www.youtube.com/watch?v=Prv3wl3X9O4", // Boom boom boom
    "https://www.youtube.com/watch?v=nADTbWQof7Y", // Your Man
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Never gonna...
    "https://www.youtube.com/watch?v=FggsEkPQEbc", // Hoff song
    "https://www.youtube.com/watch?v=CdKVX45wYeQ", // Hasselhoff
  ];

  let bangerIndex = getRandomNumber(0, bangerList.length - 1);

  createCommand({
    name: "banger",
    description: "Get random banger",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (bot: Bot, interaction: Interaction) => {
      if (++bangerIndex > bangerList.length - 1) {
        bangerIndex = 0;
      }

      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: bangerList[bangerIndex],
          },
        },
      );
    },
  });
}
