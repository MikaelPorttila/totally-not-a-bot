import { configs } from "../configs.ts";
import { createHandler as createReactionHandler } from "./reaction.ts";
import { createHandler as createStatisticsHandler } from "./statistics.ts";
import { type MessageHandler } from "./types/mod.ts";


export function getHandlers(): MessageHandler[] {
    console.log("[Bot]", "Register message handlers");
    const handlers = [];

    if (configs.featureToggles.reactions) {
        handlers.push(createReactionHandler());
    }

    if (configs.featureToggles.statistics) {
        handlers.push(createStatisticsHandler());
    }

    console.log("[Bot]", "Registered", handlers.length, "message handlers");
    return handlers;
}