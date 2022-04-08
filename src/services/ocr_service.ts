import { configs } from "../configs.ts";
import { OcrResult } from "./types/ocr_result.ts";

export async function getImageText(url: string): Promise<string> {
  console.log("[getImageText] get", url);
  const ocrUrl =
    `https://api.ocr.space/parse/imageurl?apikey=${configs.ocrServiceApplicationAuth}&url=${url}`;
  const response = await fetch(ocrUrl);
  const text: OcrResult = await response.json();
  return text.ParsedResults?.[0]?.ParsedText;
}
