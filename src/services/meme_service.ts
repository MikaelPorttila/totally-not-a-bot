import { DOMParser } from "../../deps.ts";
import type { Meme } from "../types/meme.ts";
import { configs } from "../configs.ts";

const parser = new DOMParser();

export async function queryMeme(queryText: string): Promise<Meme | undefined> {
  if (!configs.memeServiceEndpoint) {
    console.log("[MemeService]", "memeServiceEndpoint missing");
    return;
  }

  const queryUrl = encodeURI(
    `${configs.memeServiceEndpoint}${queryText}`,
  );
  const response = await fetch(queryUrl);
  const html = await response.text();
  const element = parser
    .parseFromString(html, "text/html")
    ?.querySelector(".entry-grid-body td img");

  return element
    ? {
      title: element.attributes.title as string,
      img: element.attributes["data-src"] as string,
    } as Meme
    : undefined;
}
