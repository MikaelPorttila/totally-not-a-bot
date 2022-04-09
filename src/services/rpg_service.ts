import type { RegisterUserResult } from "./types/rpg.ts";
import type { User } from "./types/user.ts";
import {
  addUser,
  getUserByDiscordId,
  getUserByUsername,
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
      message: `Discord account has already been registered as "${user.username}"`,
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
  } as User);

  return { success: true };
}
