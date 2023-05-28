import type { Bot } from "../../deps.ts";
import { configs } from "../configs.ts";
import { fileExists, readJson, writeJson } from "../helpers/file_helper.ts";
import { createScheduledJob } from "../helpers/scheduled_job_helper.ts";
import { getGameDeals } from "../services/game_deal_service.ts";
import { logWarning } from "../services/log_helper.ts";

const jobName = "Feed";
const storageFileName = "game-deals.json";

async function getStorageDate(): Promise<Date | null> {
    return (await fileExists(storageFileName)) ? (await readJson<Date>(storageFileName)) : null;
}

async function setStorageDate(date: Date): Promise<void> {
    await writeJson(storageFileName, date);
}

export async function registerGameDealsJob(guildId: bigint) {
    let channelId: bigint | undefined;
    let lastUpdated: Date | null;
    await createScheduledJob({
        name: jobName,
        schedule: '*/15 * * * *',
        setup: async (_: Bot) => {
            channelId = configs.feedChannels.gameDealChannelId;
            if (!configs.feedChannels.gameDealChannelId) {
                logWarning(`Job ${jobName} missing gameDealChannelId`);
                return false;
            }

            lastUpdated = await getStorageDate();
            return true;
        },
        execute: async (bot: Bot) => {
            if (!channelId) {
                return;
            }

            const gameDeals = await getGameDeals();
            const unpublishedDeals = lastUpdated ? gameDeals.filter(x => lastUpdated !== null && x.published > lastUpdated) : gameDeals;
            for (const deal of unpublishedDeals) {
                await bot.helpers.sendMessage(channelId, {
                    content: `Speldeal! - ${deal.title}: ${deal.url}`
                });

                if (lastUpdated == null || deal.published > lastUpdated) {
                    lastUpdated = deal.published;
                }
            }

            await setStorageDate(lastUpdated as Date);
        }
    })
}