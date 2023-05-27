import { Collection, createBot, getEmojis, GatewayIntents } from "../deps.ts";
import type {
  Bot,
  CreateApplicationCommand,
  Interaction,
  Message
} from "../deps.ts";
import { createReactionHandler, /* createRpgHandler */ } from "./handlers/mod.ts";
import type { MessageHandler } from "./handlers/types/mod.ts";
import { configs } from "./configs.ts";
import type { BotClient } from "./types/bot_client.ts";
import { registerCommands } from "./commands/mod.ts";
import type { Command } from "./types/commands.ts";

let handlers: MessageHandler[];

const clientBot = createBot({
  token: configs.token,
  applicationId: configs.applicationId,
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages | GatewayIntents.MessageContent,
  events: {
    async ready(bot: Bot, payload) {
      console.log("[Bot]", "Starting...");
      const guildId = payload.guilds[0] as bigint;
      clientBot.emojis = await getEmojis(bot, guildId);

      console.log("[Bot]", "Register message handlers");
      handlers = [];

      if (configs.featureToggles.reactions) {
        handlers.push(createReactionHandler());
      } else {
        console.log("Skipped Reaction handler due to feature toggle");
      }

      console.log("[Bot]", "Registered", handlers.length, "message handlers");

      registerCommands();
      console.log("[Bot] Registered", clientBot.commands.size, "commands");

      bot.helpers.upsertGuildApplicationCommands(guildId, clientBot.commands.array() as CreateApplicationCommand[]);

      console.log("[Bot] is Running ✅");
    },
    async messageCreate(bot: Bot, message: Message) {
      if (message.isFromBot) {
        return;
      }

      const messageText = message.content.trim().toLocaleLowerCase();
      if (!messageText) {
        return;
      }

      const messageWords = messageText.split(/\s+|\./);
      for (const handler of handlers) {
        try {
          await handler(bot, message, messageWords);
        } catch (err) {
          console.error("Handler error", err);
        }
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

      try {
        await command.execute(bot, interaction);
        console.log(`[${interactionName} Command] executed`);
      } catch (err) {
        console.error(`[${interactionName} Command] Failed`, err);
      }
    },
  },
}) as BotClient;

clientBot.commands = new Collection<string, Command>();
export const bot = clientBot;
