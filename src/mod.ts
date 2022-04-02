import { createBot, getEmojis, startBot } from "../deps.ts";
import type { Bot, Message } from "../deps.ts";
import {
  createEpiHandler,
  createMemeHandler,
  createNameHandler,
} from "./handlers/mod.ts";
import { EmojiService, MemeService } from "./services/mod.ts";
import { MessageHandler } from "./handlers/types/mod.ts";
import { getConfig } from "./helpers/config_helper.ts";

const config = getConfig();
let emojiService: EmojiService;
let memeService: MemeService;
let handlers: MessageHandler[];

const bot = createBot({
  botId: config.botId,
  token: config.token,
  applicationId: config.applicationId,
  intents: ["Guilds", "GuildMessages"],
  events: {
    async ready(bot: Bot, payload) {
      console.log("[Bot]", "Starting...");
      const guildId = payload.guilds[0] as bigint;
      const emojiCache = await getEmojis(bot, guildId);

      // Setup services
      console.log("[Bot]", "Register services");
      emojiService = new EmojiService(emojiCache);
      memeService = new MemeService(config);
      console.log("[Bot]", "Register services completed");

      // Setup message  handlers
      console.log("[Bot]", "Register message handlers");
      handlers = [
        createNameHandler(emojiService),
        createEpiHandler(emojiService),
        createMemeHandler(memeService),
      ];
      console.log("[Bot]", "Registered", handlers.length, "message handlers");
    },
    async messageCreate(bot: Bot, message: Message) {
      if (message.isBot) {
        return;
      }

      const messageText = message.content.trim().toLocaleLowerCase();
      for (const handler of handlers) {
        await handler(bot, message, messageText);
      }
    },
  },
});

await startBot(bot);
