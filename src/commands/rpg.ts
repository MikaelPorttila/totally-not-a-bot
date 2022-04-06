import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
  ApplicationCommandOptionTypes
} from "../../deps.ts";
import type { 
  Bot,
  Interaction,
  ApplicationCommandOption
} from "../../deps.ts";
import { createCommand } from "../helpers/command_helper.ts";

export function registerCommand() {
  createCommand({
    name: "rpg",
    description: "World of Wääw, TBH...",
    type: ApplicationCommandTypes.Message,
    execute: async (bot: Bot, interaction: Interaction) => {
      console.log('[RPG] Handle incoming interaction');

      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: "TBH 🤫",
          }
        }
      );
    },
    options: [
      {
        type: ApplicationCommandOptionTypes.User,
        name: 'Action',
        description: 'Send in commands to play the game',
        required: false
      }
    ]
  });
}

enum Actions {
  Register = "Register",
  State = "State",
  Help = "Help"
}