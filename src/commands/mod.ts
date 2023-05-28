import { registerCommand as registerPingCommand } from "./ping.ts";
import { registerCommand as registerWeatherCommand } from "./weather.ts";
import { registerCommand as registerFridayCommand } from "./friday.ts";
import { registerCommand as registerBangerCommand } from "./banger.ts";
import { registerCommand as registerTagMeCommand } from "./tag_me.ts";
import { configs } from "../configs.ts";
import { clearCommands } from "../helpers/command_helper.ts";
import { log } from "../services/log_helper.ts";

export function registerCommands(): void {
  log("Register commands");
  clearCommands();

  if (configs.featureToggles.ping) {
    registerPingCommand();
  } else {
    log("Skipped Ping command due to feature toggle");
  }

  if (configs.featureToggles.weather) {
    registerWeatherCommand();
  } else {
    log("Skipped Weather command due to feature toggle");
  }

  if (configs.featureToggles.friday) {
    registerFridayCommand();
  } else {
    log("Skipped Friday command due to feature toggle");
  }

  if (configs.featureToggles.banger) {
    registerBangerCommand();
  } else {
    log("Skipped Banger command due to feature toggle");
  }

  if (configs.featureToggles.tagMe) {
    registerTagMeCommand();
  } else {
    log("Skipped TagMe command due to feature toggle");
  }
}
