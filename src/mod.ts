import { startBot, serve } from "../deps.ts";
import { bot } from "./bot.ts";

const port = 1993;
const requestHandler = (_: Request): Response => {
  return new Response('🙈', { status: 200 });
};

const server = serve(requestHandler, { port });
const botRunner = startBot(bot);
await Promise.all([server, botRunner]);
