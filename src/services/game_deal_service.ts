import { parseFeed } from "../../deps.ts";
import type { GameDeal } from "./types/mod.ts";

const dealSourceUrl = 'https://steamcommunity.com/groups/freegamesfinders/rss';

export async function getGameDeals(): Promise<GameDeal[]> {
    const response = await fetch(dealSourceUrl);
    const xml = await response.text();
    const feed = await parseFeed(xml);

    return feed.entries?.map((entry) => ({
        title: entry.title?.value,
        url: entry.id,
        published: entry.published
    } as GameDeal));
}