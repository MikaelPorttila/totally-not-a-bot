export function toBoolean(value?: string, defaultValue?: boolean): boolean {
  if (value != undefined && value !== null) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
  }

  if (defaultValue != undefined && value !== null) {
    return defaultValue;
  }

  return false;
}
