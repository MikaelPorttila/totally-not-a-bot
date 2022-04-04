import { request } from "../../deps.ts";
import { configs } from "../configs.ts";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "X-Auth-Token": configs.graphQlAuth,
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
