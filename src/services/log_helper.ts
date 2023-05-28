import { format } from "../../deps.ts";
const dateFormatStr = "yyyy-MM-dd HH:mm";

export function log(...data: any[]): void {
    console.log(`[Bot] ${format(new Date(), dateFormatStr)}: ${data?.join(' ')}`);
}
export function logWarning(...data: any[]): void {
    console.log(`%c[Bot] ${format(new Date(), dateFormatStr)}: ${data?.join(' ')}`, "color: orange");
}
export function logError(...data: any[]): void {
    console.log(`%c[Bot] ${format(new Date(), dateFormatStr)}: ${data?.join(' ')}`, "color: red");
}