import {
  addReaction,
  Bot,
  createChannel,
  getChannels,
  Message,
} from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import {
  executeRpgCommand,
  getRpgUserSummary,
  getUserByDiscordId,
  registerRpgUser,
  replyToMessage,
} from "../services/mod.ts";
import type { User } from "../services/types/mod.ts";
import { RpgCommand } from "../services/types/rpg_command.ts";

const MESSAGE_NOT_REGISTERED =
  "You are not registered yet. Use the register <name> command to join.";

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

    const [command, ...parameters] = normalizedMessageWords;
    let msg: string | undefined;
    let user: User | undefined;
    let successful = false;
    switch (command) {
      case RpgCommand.Move:
        user = await getUserByDiscordId(message.authorId);
        if (!user) {
          await replyToMessage(bot, message, MESSAGE_NOT_REGISTERED);
          return;
        }

        try {
          successful = await executeRpgCommand(command, user, parameters);
          addReaction(
            bot,
            message.channelId,
            message.id,
            successful ? "✅" : "❌",
          );
        } catch {
          addReaction(bot, message.channelId, message.id, "❌");
        }
        break;
      case RpgCommand.Stats:
        user = await getUserByDiscordId(message.authorId);
        await replyToMessage(
          bot,
          message,
          user ? getRpgUserSummary(user) : MESSAGE_NOT_REGISTERED,
        );
        break;
      case RpgCommand.Register:
        {
          const res = await registerRpgUser(parameters?.[0], message.authorId);
          msg = res?.success
            ? `⚔️ Welcome ${parameters?.[0]} to The World of Wääw ⚔️`
            : res?.message;
          await replyToMessage(bot, message, msg);
        }
        break;
      case RpgCommand.Help:
        msg = "**register** <name> - Step into the World of Wääw\n" +
          "**stats** - list your current stats\n" +
          "**move** <up,north,w,norr | down,south,s,syd | left,west,a,väst | right,east,d,öst> - Move your character\n" +
          "**help** - List commands";
        await replyToMessage(bot, message, msg);
        break;
    }
  };
}
