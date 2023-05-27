import { registerGameDealsJob } from "./game_deal_feeds.ts";

export async function registerJobs(guildId: bigint) {
    await registerGameDealsJob(guildId);
}