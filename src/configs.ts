import { toBoolean } from "./helpers/boolean_helper.ts";
import { toBigInt } from "./helpers/number_helper.ts";
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
    statistics: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_STATISTICS"), true),
    status: toBoolean(Deno.env.get("TNAB_FEATURE_TOGGLE_STATUS"), true),
  },
  feedChannels: {
    gameDealChannelId: toBigInt(Deno.env.get("TNAB_FEED_GAME_DEALS_CHANNEL_ID"))
  }
} as Config;
