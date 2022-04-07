import { registerCommand as registerPingCommand } from "./ping.ts";
import { registerCommand as registerWeatherCommand } from "./weather.ts";
import { registerCommand as registerFridayCommand } from "./friday.ts";
import { registerCommand as registerRpgCommand } from "./rpg.ts";
import { registerCommand as registerGiffTextCommand } from './giff_text.ts';
import { registerCommand as registerBangerCommand } from './banger.ts';

export function registerCommands(): void {
    console.log("[Bot] Register commands");
    registerPingCommand();
    registerWeatherCommand();
    registerFridayCommand();
    registerRpgCommand();
    registerGiffTextCommand();
    registerBangerCommand();
    console.log("[Bot] Registered commands");
}