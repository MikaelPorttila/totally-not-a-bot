import type { Config } from "./types/mod.ts";

const botIdConfig = Deno.env.get("TNAB_BOT_ID");
if (!botIdConfig) {
  throw "Missing botId";
}

const token = Deno.env.get("TNAB_TOKEN");
if (!token) {
  throw "Missing token";
}

const applicationIdConfig = Deno.env.get("TNAB_APPLICATION_ID");
if (!applicationIdConfig) {
  throw "Missing applicationId";
}

export const configs = {
  botId: BigInt(botIdConfig),
  applicationId: BigInt(applicationIdConfig),
  token,
  memeServiceEndpoint: Deno.env.get("TNAB_MEME_SERVICE_ENDPOINT"),
  openWeatherApplicationId: Deno.env.get("TNAB_OPEN_WEATHER_APPLICATION_ID"),
  env: Deno.env.get("NODE_ENV"),
  deploymentId: Deno.env.get("DENO_DEPLOYMENT_ID"),
  productionEndpointUrl: Deno.env.get("TNAB_PRODUCTION_ENDPOINT_URL"),
} as Config;
