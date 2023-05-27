import { toBoolean } from "./helpers/boolean_helper.ts";
import type { Config } from "./types/mod.ts";

const token = Deno.env.get("TNAB_TOKEN");
if (!token) {
  throw "Missing token";
}

const applicationIdConfig = Deno.env.get("TNAB_APPLICATION_ID");
if (!applicationIdConfig) {
  throw "Missing applicationId";
}

export const configs = {
  applicationId: BigInt(applicationIdConfig),
  token,
  openWeatherApplicationId: Deno.env.get("TNAB_OPEN_WEATHER_APPLICATION_ID"),
  env: Deno.env.get("NODE_ENV"),
  featureToggles: {
    banger: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_BANGER"), true),
    friday: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_FRIDAY"), true),
    ping: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_PING"), true),
    reactions: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_REACTIONS"), true),
    weather: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_WEATHER"), true),
    tagMe: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_TAG_ME"), true),
  },
  feedChannels: {
    gameDeals: Deno.env.get("TNAB_FEED_CHANNEL_GAME_DEALS")
  }
} as Config;
