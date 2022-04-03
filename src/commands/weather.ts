import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import type { Bot, Interaction } from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";
import { DEFAULT_CITIES, WeatherService } from "../services/mod.ts";

export function registerCommand(weatherService: WeatherService) {
  createCommand({
    name: "wääder",
    description: "Visa vädret för relevanta kommuner",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (bot: Bot, interaction: Interaction) => {
      const weatherSummary = await weatherService.getSummary(DEFAULT_CITIES);

      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: weatherSummary,
          },
        },
      );
    },
  });
}
