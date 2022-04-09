export enum RpgCommand {
  Unknown = "",
  Register = "register",
  Help = "help",
  Stats = "stats",
  Move = "move",
}

export function parseRpgCommand(command: string): RpgCommand {
  switch (command) {
    case RpgCommand.Help:
      return RpgCommand.Help;
    case RpgCommand.Move:
      return RpgCommand.Move;
    case RpgCommand.Register:
      return RpgCommand.Register;
    case RpgCommand.Stats:
      return RpgCommand.Stats;
    default:
      return RpgCommand.Unknown;
  }
}
