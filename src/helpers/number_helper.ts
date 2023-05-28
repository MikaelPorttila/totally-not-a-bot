import { logWarning } from "../services/log_helper.ts";

export function toBigInt(value?: string, defaultValue?: bigint): bigint | undefined {
    if (value != undefined && value !== null) {
        try {
            return BigInt(value);
        }
        catch {
            logWarning('Failed to parse bigint');
        }
      }
    
      if (defaultValue != undefined && value !== null) {
        return defaultValue;
      }
    
      return undefined;
}