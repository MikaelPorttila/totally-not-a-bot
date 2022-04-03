import { serve, startBot, stopBot } from "../deps.ts";
import { bot } from "./bot.ts";
import { configs } from "./configs.ts";

const initBot = true;
if (configs.deploymentId) {
  console.log("Deployment Id", configs.deploymentId);

  const port = 443;
  const handler = (request: Request): Response => {
    const url = new URL(request.url);

    let body = "Your user-agent is:\n\n";
    body += (request.headers.get("user-agent") || "Unknown") + "\n\n";
    body += url.searchParams.get("deploymentId");

    return new Response(body, { status: 200 });
  };

  console.log(`HTTP webserver running.`);
  await serve(handler, { port });
}

/* if (configs.deploymentId && configs.productionEndpointUrl) {
    const result = await fetch(`${configs.productionEndpointUrl}?deploymentId=${configs.deploymentId}`)
    initBot = true;
}
else {
    initBot = true;
} */

if (initBot) {
  await startBot(bot);
}
