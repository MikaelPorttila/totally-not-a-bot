import { Bot, createChannel, getChannels, Message } from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import { sendMessage } from "../../deps.ts";
import { registerRpgUser } from "../services/mod.ts";

export async function createHandler(
  bot: Bot,
  guildId: bigint,
): Promise<MessageHandler> {
  const rpgChannelName = "rpg";
  const channels = await getChannels(bot, guildId);

  let rpgChannel = channels.find((x) => x.name === rpgChannelName);
  if (!rpgChannel) {
    rpgChannel = await createChannel(bot, guildId, { name: rpgChannelName });
  }

  const rpgChannelId = rpgChannel.id;

  return async function (
    bot: Bot,
    message: Message,
    normalizedMessageWords: string[],
  ) {
    if (message.channelId !== rpgChannelId) {
      return;
    }

    switch (normalizedMessageWords[0]) {
      case RpgCommand.Register:
        {
          let username = "";
          if (normalizedMessageWords.length > 1) {
            username = normalizedMessageWords[1];
          }
          const registrationResult = await registerRpgUser(
            username,
            message.authorId,
          );
          if (registrationResult?.success) {
            await sendMessage(
              bot,
              message.channelId,
              {
                content: `⚔️ Welcome ${username} to The World of Wääw ⚔️`,
                messageReference: {
                  channelId: message.channelId,
                  guildId: message.guildId,
                  messageId: message.id,
                  failIfNotExists: false,
                },
              },
            );
          } else {
            await sendMessage(
              bot,
              message.channelId,
              {
                content: registrationResult?.message,
                messageReference: {
                  channelId: message.channelId,
                  guildId: message.guildId,
                  messageId: message.id,
                  failIfNotExists: false,
                },
              },
            );
          }
        }
        break;

      case RpgCommand.Help:
        await sendMessage(
          bot,
          message.channelId,
          {
            content: "" +
              "register <name> - Step into the World of Wääw\n" +
              "help - List commands",
            messageReference: {
              channelId: message.channelId,
              guildId: message.guildId,
              messageId: message.id,
              failIfNotExists: false,
            },
          },
        );
        break;
    }
  };
}

enum RpgCommand {
  Register = "register",
  Help = "help",
}
