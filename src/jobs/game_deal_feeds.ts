import type { Bot } from "../../deps.ts";
import { configs } from "../configs.ts";
import { fileExists, readJson, writeJson } from "../helpers/file_helper.ts";
import { createScheduledJob } from "../helpers/scheduled_job_helper.ts";
import { getGameDeals } from "../services/game_deal_service.ts";

const jobName = "Feed";
const storageFileName = "game-deals.json";

async function getStorageDate(): Promise<Date | null> {
    return (await fileExists(storageFileName)) ? (await readJson<Date>(storageFileName)) : null;
}

async function setStorageDate(date: Date): Promise<void> {
    await writeJson(storageFileName, date);
}

export async function registerGameDealsJob(guildId: bigint) {
    let channelId: bigint;
    let lastUpdated: Date | null;
    await createScheduledJob({
        name: jobName,
        schedule: '*/15 * * * *',
        setup: async (bot: Bot) => {
            if (!configs.feedChannels.gameDeals) {
                return false;
            }

            for (const [_, channel] of await bot.helpers.getChannels(guildId)) {
                if (channel.name?.toLocaleLowerCase() === configs.feedChannels.gameDeals) {
                    channelId = channel.id;
                }
            }

            const foundChannel = channelId !== undefined;
            if (!foundChannel) {
                return false;
            }

            lastUpdated = await getStorageDate();

            return foundChannel;
        },
        execute: async (bot: Bot) => {
            const gameDeals = await getGameDeals();
            const unpublishedDeals = gameDeals.filter(x => lastUpdated == null || x.published > lastUpdated);
            for (const deal of unpublishedDeals) {
                await bot.helpers.sendMessage(channelId, {
                    content: `Ny speldeal! - [${deal.title}](${deal.url})`
                });

                if (lastUpdated == null || deal.published > lastUpdated) {
                    lastUpdated = deal.published;
                }
            }

            await setStorageDate(lastUpdated as Date);
        }
    })
}