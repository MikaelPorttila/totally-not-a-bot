import { Bot, deleteMessage, Message, sendMessage } from "../../deps.ts";
import { MemeService } from "../services/meme_service.ts";
import { MessageHandler } from "./types/mod.ts";

export function createHandler(memeService: MemeService): MessageHandler {
  const trigger = "!meme";

  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageWords: string[],
  ) {
    if (!normalizedMessageWords.some((word) => word === trigger)) {
      return;
    }
    console.log("[Meme Message Handle] triggered");

    const queryText = message.content.replace(trigger + " ", "").trim();
    const meme = await memeService.query(queryText);

    await deleteMessage(
      bot,
      message.channelId,
      message.id,
      "Bot replaced message with image",
    );

    if (meme) {
      await sendMessage(bot, message.channelId, {
        content: `${message.member?.nick} beställde:`,
      });
      await sendMessage(bot, message.channelId, { content: meme.img });
    } else {
      console.log(
        "[Meme Message Handler]",
        "Meme not found",
        'queryText: "',
        queryText,
        '"',
      );
    }
  };
}
