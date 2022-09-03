/* import type { RegisterUserResult } from "./types/rpg.ts";
import { RpgCommand } from "./types/rpg_command.ts";
import type { User } from "./types/user.ts";
import {
  addUser,
  getUserByDiscordId,
  getUserByUsername,
  updateUserState,
} from "./user_service.ts";

export async function registerRpgUser(
  username?: string,
  discordUserId?: bigint,
): Promise<RegisterUserResult | undefined> {
  if (!username) {
    return {
      success: false,
      message: "Please enter username.",
    } as RegisterUserResult;
  }

  if (!discordUserId) {
    return {
      success: false,
      message: "Can't resolve Discord id.",
    } as RegisterUserResult;
  }

  let user = await getUserByDiscordId(discordUserId);
  if (user) {
    return {
      success: false,
      message:
        `Discord account has already been registered as "${user.username}"`,
    } as RegisterUserResult;
  }

  user = await getUserByUsername(username);
  if (user) {
    return {
      success: false,
      message: "Username already taken.",
    } as RegisterUserResult;
  }

  await addUser({
    username: username,
    discordId: discordUserId.toString(),
    exp: 0,
    gold: 0,
    stamina: 5,
    region: 0,
    posX: 5,
    posY: 5,
  } as User);

  return { success: true };
}

export async function executeRpgCommand(
  command: RpgCommand,
  user: User,
  parameters: string[],
): Promise<boolean> {
  let result = false;
  switch (command) {
    case RpgCommand.Move:
      switch (parameters[0]) {
        case "up":
        case "north":
        case "w":
        case "norr":
          user.posY--;
          user.exp++;
          await updateUserState(user);
          result = true;
          break;

        case "down":
        case "south":
        case "s":
        case "syd":
          user.posY++;
          user.exp++;
          await updateUserState(user);
          result = true;
          break;
        case "left":
        case "west":
        case "a":
        case "väst":
          user.posX--;
          user.exp++;
          await updateUserState(user);
          result = true;
          break;
        case "right":
        case "east":
        case "d":
        case "öst":
          user.posX++;
          user.exp++;
          await updateUserState(user);
          result = true;
          break;
      }

      break;
  }

  return result;
}

export function getRpgUserSummary(user: User) {
  let result = `**${user.username}**\n`;
  result += `Exp: ${user.exp}\n`;
  result += `Gold: ${user.gold}\n`;
  result += `Region: ${user.region}\n`;
  result += `PosX: ${user.posX}\n`;
  result += `PosY: ${user.posY}`;

  return result;
}
 */