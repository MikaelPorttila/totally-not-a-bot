import type { FeatureToggles } from "./feature_toggles.ts";

export interface Config {
  botId: bigint;
  applicationId: bigint;
  token: string;
  memeServiceEndpoint?: string;
  openWeatherApplicationId?: string;
  env: string;
  deploymentId: string;
  productionEndpointUrl: string;
  graphQlEndpoint: string;
  graphQlApiKey: string;
  ocrServiceApplicationAuth: string;
  featureToggles: FeatureToggles;
}
