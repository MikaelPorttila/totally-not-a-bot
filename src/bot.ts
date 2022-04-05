import { Collection, createBot, getEmojis } from "../deps.ts";
import type {
  Bot,
  CreateApplicationCommand,
  Interaction,
  Message,
} from "../deps.ts";
import { createReactionHandler, createWeatherHandler } from "./handlers/mod.ts";
import { MessageHandler } from "./handlers/types/mod.ts";
import { configs } from "./configs.ts";
import type { BotClient } from "./types/bot_client.ts";
import {
  registerFridayCommand,
  registerPingCommand,
  registerRpgCommand,
  registerWeatherCommand,
  registerGiffTextCommand
} from "./commands/mod.ts";
import type { Command } from "./types/commands.ts";

let handlers: MessageHandler[];

const clientBot = createBot({
  botId: configs.botId,
  token: configs.token,
  applicationId: configs.applicationId,
  intents: ["Guilds", "GuildMessages"],
  events: {
    async ready(bot: Bot, payload) {
      console.log("[Bot]", "Starting...");
      const guildId = payload.guilds[0] as bigint;

      console.log("[Bot]", "Register services");
      clientBot.emojis = await getEmojis(bot, guildId);
      console.log("[Bot]", "Register services completed");

      console.log("[Bot]", "Register message handlers");
      handlers = [
        createReactionHandler(),
        createWeatherHandler(),
      ];
      console.log("[Bot]", "Registered", handlers.length, "message handlers");

      console.log("[Bot]", "Register commands");
      registerPingCommand();
      registerWeatherCommand();
      registerFridayCommand();
      registerRpgCommand();
      registerGiffTextCommand();
      console.log("[Bot]", "Registered commands");

      await bot.helpers.upsertApplicationCommands(
        clientBot.commands.array() as CreateApplicationCommand[],
      );
    },
    async messageCreate(bot: Bot, message: Message) {
      if (message.isBot) {
        return;
      }

      const messageText = message.content.trim().toLocaleLowerCase();
      if (!messageText) {
        return;
      }

      const messageWords = messageText.split(/\s+|\./);
      for (const handler of handlers) {
        await handler(bot, message, messageWords);
      }
    },
    async interactionCreate(bot: Bot, interaction: Interaction) {
      const interactionName = interaction.data?.name;
      if (!interactionName) {
        return;
      }
      console.log(`[${interactionName} Command]`, "request");

      const command = clientBot.commands.find((_, name) =>
        name === interactionName
      );

      if (!command) {
        return;
      }

      await command.execute(bot, interaction);
      console.log(`[${interactionName} Command]`, "executed");
    },

  },
}) as BotClient;

clientBot.commands = new Collection<string, Command>();
export const bot = clientBot;
