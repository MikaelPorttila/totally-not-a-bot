import { startBot, serve } from "../deps.ts";
import { bot } from "./bot.ts";

const port = 1993;
const defaultResponse = new Response('🙈', { status: 200 });
const handler = (_: Request): Response => {
  return defaultResponse;
};

const server = serve(handler, { port });
const botRunner = startBot(bot);
await Promise.all([server, botRunner]);
