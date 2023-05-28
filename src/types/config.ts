import type { FeatureToggles } from "./feature_toggles.ts";

export interface Config {
  botId: bigint;
  applicationId: bigint;
  token: string;
  openWeatherApplicationId?: string;
  env: string;
  featureToggles: FeatureToggles;
  feedChannels: {
    gameDealChannelId?: bigint;
  }
}
