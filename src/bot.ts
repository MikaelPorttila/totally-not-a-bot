import {
  Collection,
  createBot
} from "../deps.ts";
import type { Bot, Message, CreateApplicationCommand, Interaction } from "../deps.ts";
import { createReactionHandler } from "./handlers/mod.ts";
import { createEmojiService, EmojiService } from "./services/mod.ts";
import { MessageHandler } from "./handlers/types/mod.ts";
import { configs } from "./configs.ts";
import type { BotClient } from "./types/bot_client.ts";
import { allCommands } from "./commands/mod.ts";
import type { Command } from "./types/commands.ts";

let emojiService: EmojiService;
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
      emojiService = await createEmojiService(bot, guildId);
      console.log("[Bot]", "Register services completed");

      console.log("[Bot]", "Register message handlers");
      handlers = [
        createReactionHandler(emojiService)
      ];
      console.log("[Bot]", "Registered", handlers.length, "message handlers");

      console.log("[Bot]", "Register commands");
      allCommands.forEach(commandRegistrator => commandRegistrator());
      console.log("[Bot]", "Registered", allCommands.length, "commands");

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

      for (const handler of handlers) {
        await handler(bot, message, messageText);
      }
    },
    async interactionCreate(bot: Bot, interaction: Interaction) {
      const interactionName = interaction.data?.name;
      if (!interactionName) {
        return;
      }

      const cmd = clientBot.commands.find((_, name) =>
        name === interactionName
      );
      if (!cmd) {
        return;
      }

      await cmd.execute(bot, interaction);
      console.log(`[${interactionName} Command]`, "executed");
    },
  },
}) as BotClient;

clientBot.commands = new Collection<string, Command>();
export const bot = clientBot;
