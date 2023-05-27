const whiteSpaceOrSymbolsPattern = /\s+|[?!{}()\[\].;,+\-*/&|<>=~\n_]/;
export function tokenizeString(str: string): string[] {
    return !str ? [] : stripAnsi(str).split(whiteSpaceOrSymbolsPattern)
}

export function stripAnsi(str: string): string {
    // Todo: Extend ansi ranges to cover more emotes.
    return str?.replace(/[\u{1f300}-\u{1f5ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{1f900}-\u{1f9ff}]/gu, '') ?? str;
}