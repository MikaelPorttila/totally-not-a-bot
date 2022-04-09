import { toBoolean } from "./helpers/boolean_helper.ts";
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
  graphQlEndpoint: Deno.env.get("TNAB_GRAPH_QL_ENDPOINT"),
  graphQlApiKey: Deno.env.get("TNAB_GRAPH_QL_API_KEY"),
  ocrServiceApplicationAuth: Deno.env.get("TNAB_OCR_SERVICE_APPLICATION_AUTH"),
  featureToggles: {
    banger: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_BANGER"), true),
    friday: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_FRIDAY"), true),
    giffText: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_GIFF_TEXT"), true),
    ping: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_PING"), true),
    rpg: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_RPG"), true),
    meme: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_MEME"), true),
    reactions: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_REACTIONS"), true),
    weather: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_WEATHER"), true),
  },
} as Config;
