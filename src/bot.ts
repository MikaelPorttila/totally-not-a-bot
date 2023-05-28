import { Collection, createBot, getEmojis, GatewayIntents } from "../deps.ts";
import type {
  Bot,
  CreateApplicationCommand,
  Interaction,
  Message
} from "../deps.ts";
import { getHandlers } from "./handlers/mod.ts";
import type { MessageHandler } from "./handlers/types/mod.ts";
import { configs } from "./configs.ts";
import type { BotClient } from "./types/bot_client.ts";
import { registerCommands } from "./commands/mod.ts";
import type { Command } from "./types/commands.ts";
import { tokenizeString } from "./helpers/string_helper.ts";
import { registerJobs } from "./jobs/mod.ts";
import { setupDatabase } from "./services/db_service.ts";
import { log, logError } from "./services/log_helper.ts";

let handlers: MessageHandler[];

setupDatabase();

const clientBot = createBot({
  token: configs.token,
  applicationId: configs.applicationId,
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages | GatewayIntents.MessageContent | GatewayIntents.GuildEmojis | GatewayIntents.GuildMembers,
  events: {
    async ready(bot: Bot, payload) {
      log("Starting...");
      const guildId = payload.guilds[0] as bigint;
      log('GuildId', guildId);
      clientBot.emojis = await getEmojis(bot, guildId);

      handlers = getHandlers();

      registerCommands();
      log(`Registered ${clientBot.commands.size} commands`);
      bot.helpers.upsertGuildApplicationCommands(guildId, clientBot.commands.array() as CreateApplicationCommand[]);
      log("Running ✅");

      await registerJobs(guildId);
    },
    async messageCreate(bot: Bot, message: Message) {
      if (message.isFromBot) {
        return;
      }

      const messageText = message.content.trim().toLocaleLowerCase();
      if (!messageText) {
        return;
      }

      const messageWords = tokenizeString(messageText);
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

      log(`[${interactionName} Command] request`);

      const command = clientBot.commands.find((_, name) =>
        name === interactionName
      );

      if (!command) {
        return;
      }

      try {
        await command.execute(bot, interaction);
        log(`[${interactionName} Command] executed`);
      } catch (err) {
        logError(`[${interactionName} Command] Failed`, err);
      }
    },
  },
}) as BotClient;

clientBot.commands = new Collection<string, Command>();
export const bot = clientBot;
