import { Bot, Message, sendMessage } from "../../deps.ts";
import { WeatherService } from "../services/mod.ts";
import { MessageHandler } from "./types/mod.ts";

export function createHandler(weatherService: WeatherService): MessageHandler {
  const trigger = "!wääder";
  const fakeTyreso = "Bollmora";
  const cities = ["farsta", "sollentuna", "vallentuna", "solna", fakeTyreso];
  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageContent: string,
  ) {
    if (normalizedMessageContent.indexOf(trigger) === -1) {
      return;
    }

    const weatherSummary = await weatherService.getSummary(cities);
    await sendMessage(
        bot,
        message.channelId,
        { 
            content: weatherSummary,
            messageReference: {
                channelId: message.channelId,
                guildId: message.guildId,
                messageId: message.id,
                failIfNotExists: false
            } 
        }
    );
  };
}
