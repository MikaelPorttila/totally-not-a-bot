import { serve, startBot, stopBot } from "../deps.ts";
import { bot } from "./bot.ts";
import { configs } from "./configs.ts";

let runBot = true;

/*
    Deno Deploy is running multiple staging environments.
    This allows use to stop the bot from running in the stage environments.
*/
if (configs.deploymentId) {
  console.log("Deployment Id", configs.deploymentId);
  const port = 443;
  const handler = (request: Request): Response => {
    const deploymentId = new URL(request.url).searchParams.get("deploymentId");
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

if (configs.deploymentId && configs.productionEndpointUrl) {
  console.log("[Deployment check]", "activated");
  setInterval(async () => {
    const deploymentCheckResponse = await fetch(
      `${configs.productionEndpointUrl}?deploymentId=${configs.deploymentId}`,
    );
    const isProductionInstance: boolean = await deploymentCheckResponse.json();

    if (!runBot && isProductionInstance) {
      // run
      console.log("[Bot] should start bot");
    } else if (runBot && !isProductionInstance) {
      // stop bot
      console.log("[Bot] should stop bot");
    }
  }, 5000);
}

if (runBot) {
  await startBot(bot);
  console.log("[Bot stopped]");
}
