import { DOMParser } from "../../deps.ts";
import type { Meme } from "../types/meme.ts";
import type { Config } from "../types/mod.ts";

export class MemeService {
  private parser: DOMParser;
  constructor(private config: Config) {
    this.parser = new DOMParser();
  }

  async query(queryText: string): Promise<Meme | undefined> {
    if (!this.config.memeServiceEndpoint) {
      console.log("[MemeService]", "memeServiceEndpoint missing");
      return;
    }

    const queryUrl = encodeURI(
      `${this.config.memeServiceEndpoint}${queryText}`,
    );
    const rawHtml = await fetch(queryUrl).then((res) => res.text());
    const element = this.parser
      .parseFromString(rawHtml, "text/html")
      ?.querySelector(".entry-grid-body td img");

    return element
      ? {
        title: element.attributes.title as string,
        img: element.attributes["data-src"] as string,
      } as Meme
      : undefined;
  }
}
