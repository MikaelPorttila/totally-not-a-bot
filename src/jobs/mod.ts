import { registerGameDealsJob } from "./game_deal_feeds.ts";

export function registerJobs(guildId: bigint) {
    registerGameDealsJob(guildId);
}