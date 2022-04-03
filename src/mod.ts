import { serve, startBot, stopBot } from "../deps.ts";
import { bot } from "./bot.ts";
import { configs } from "./configs.ts";

const initBot = true;

/*
    Deno Deploy is running multiple staging environments.
    This allows use to stop the bot from running in the stage environments.
*/
if (configs.deploymentId) {
  console.log("Deployment Id", configs.deploymentId);
  const port = 443;
  const handler = (request: Request): Response => {
    const deploymentId =  new URL(request.url)
        .searchParams
        .get("deploymentId");
    console.log(`[Deployment check] deployment id:`, deploymentId);
    const match = deploymentId === configs.deploymentId;
    return new Response(JSON.stringify(match), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
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
