import { sendMessage } from "../../deps.ts";
import { Bot, Message } from "../../deps.ts";
import { DEFAULT_WEATHER_AREAS, getWeatherSummary } from "../services/mod.ts";
import type { MessageHandler } from "./types/mod.ts";

export function createHandler(): MessageHandler {
  const trigger = "!wääder";
  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageWords: string[],
  ) {
    if (normalizedMessageWords[0] !== trigger) {
      return;
    }

    const weatherSummary = await getWeatherSummary(DEFAULT_WEATHER_AREAS);
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
