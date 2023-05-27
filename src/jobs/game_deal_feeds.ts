import type { BigString, Bot } from "../../deps.ts";
import { configs } from "../configs.ts";
import { createScheduledJob } from "../helpers/scheduled_job_helper.ts";

export function registerGameDealsJob(guildId: bigint) {
    const channelIdCache = new Map<bigint, BigString>();
    createScheduledJob({
        name: 'Feed',
        // 5 sec: '*/5 * * * * *'
        schedule: '*/15 * * * *',
        prerequisites: () => !!configs.feedChannels.gameDeals,
        execute: async (bot: Bot) => {
            let channelId = channelIdCache.get(guildId);
            if (!channelId) {
                const channels = await bot.helpers.getChannels(guildId);
                for (const [_, channel] of channels) {
                    if (channel.name?.toLocaleLowerCase() === configs.feedChannels.gameDeals) {
                        channelId = channel.id;
                    }
                }

                channelIdCache.set(guildId, channelId as BigString);
            }

            if (channelId) {
                bot.helpers.sendMessage(channelId, {
                    content: 'Hello Feed!'
                });
            } else {
                console.warn(`[Bot] GameDeals can't channel ${configs.feedChannels.gameDeals}`);
            }
        }
    })
}