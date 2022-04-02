import { Collection, createBot } from "../deps.ts";
import type { Bot, Message } from "../deps.ts";
import { createEpiHandler, createNameHandler } from "./handlers/mod.ts";
import { createEmojiService, EmojiService } from "./services/mod.ts";
import { MessageHandler } from "./handlers/types/mod.ts";
import { configs } from "./configs.ts";
import type { BotClient } from "./types/bot_client.ts";
import { registerPingCommand } from "./commands/mod.ts";

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
        createNameHandler(emojiService),
        createEpiHandler(emojiService),
      ];
      console.log("[Bot]", "Registered", handlers.length, "message handlers");

      registerPingCommand();

      await bot.helpers.upsertApplicationCommands(
        clientBot.commands.array() as any,
        guildId,
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
  },
}) as BotClient;

clientBot.commands = new Collection();
export const bot = clientBot;
