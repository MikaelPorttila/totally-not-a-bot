import type { Bot, Message } from "../../deps.ts";
import type { MessageHandler } from "./types/mod.ts";
import { addReaction } from "../../deps.ts";
import { getEmojiReactionName } from "../services/emoji_service.ts";
import { replyToMessage } from "../services/mod.ts";

interface ReactionEntry {
  for: string[],
  reaction?: string;
  reply?: string;
}

export function createHandler(): MessageHandler {
  return async function (
    _: Bot,
    message: Message,
    __: string[],
  ) {
    await new Promise<void>((resolve) => {
       /*  const memberId = message?.member?.user?.id;
        console.log(message); */
        resolve()
    });
  };
}
