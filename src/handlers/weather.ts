import { Bot, Message, sendMessage } from "../../deps.ts";
import { DEFAULT_CITIES, WeatherService } from "../services/mod.ts";
import { MessageHandler } from "./types/mod.ts";

export function createHandler(weatherService: WeatherService): MessageHandler {
  const trigger = "!wääder";
  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageContent: string,
  ) {
    if (normalizedMessageContent.indexOf(trigger) === -1) {
      return;
    }

    const weatherSummary = await weatherService.getSummary(DEFAULT_CITIES);
    await sendMessage(
      bot,
      message.channelId,
      {
        content: weatherSummary,
        messageReference: {
          channelId: message.channelId,
          guildId: message.guildId,
          messageId: message.id,
          failIfNotExists: false,
        },
      },
    );
  };
}
