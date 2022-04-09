import { request } from "../../deps.ts";
import { configs } from "../configs.ts";

const DGRAPH_ENDPOINT_AUTH_HEADER = "DG-Auth";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  [DGRAPH_ENDPOINT_AUTH_HEADER]: configs.graphQlApiKey
};

export async function queryOrMutation<T>(
  payload: string,
  variables: any = null,
): Promise<T | undefined> {
  if (!payload) {
    return;
  }

  return await request(
    configs.graphQlEndpoint,
    payload,
    variables,
    DEFAULT_HEADERS,
  );
}
