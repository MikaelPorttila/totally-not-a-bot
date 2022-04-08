export function isImage(contentType?: string): boolean {
  return contentType?.indexOf("image/") === 0;
}
