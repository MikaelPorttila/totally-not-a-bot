import { registerCommand as registerPingCommand } from "./ping.ts";
import { registerCommand as registerWeatherCommand } from "./weather.ts";
import { registerCommand as registerFridayCommand } from "./friday.ts";
import { registerCommand as registerRpgCommand } from "./rpg.ts";
import { registerCommand as registerGiffTextCommand } from "./giff_text.ts";
import { registerCommand as registerBangerCommand } from "./banger.ts";
import { registerCommand as registerTagMeCommand } from "./tag_me.ts";
import { configs } from "../configs.ts";

export function registerCommands(): void {
  console.log("[Bot] Register commands");

  if (configs.featureToggles.ping) {
    registerPingCommand();
  } else {
    console.log("Skipped Ping command due to feature toggle");
  }

  if (configs.featureToggles.weather) {
    registerWeatherCommand();
  } else {
    console.log("Skipped Weather command due to feature toggle");
  }

  if (configs.featureToggles.friday) {
    registerFridayCommand();
  } else {
    console.log("Skipped Friday command due to feature toggle");
  }

  if (configs.featureToggles.rpg) {
    registerRpgCommand();
  } else {
    console.log("Skipped RPG command due to feature toggle");
  }

  if (configs.featureToggles.giffText) {
    registerGiffTextCommand();
  } else {
    console.log("Skipped Giff Text command due to feature toggle");
  }

  if (configs.featureToggles.banger) {
    registerBangerCommand();
  } else {
    console.log("Skipped Banger command due to feature toggle");
  }

  if (configs.featureToggles.tagMe) {
    registerTagMeCommand();
  } else {
    console.log("Skipped TagMe command due to feature toggle");
  }
}
