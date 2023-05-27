export function isImage(contentType?: string): boolean {
  return contentType?.indexOf("image/") === 0;
}

export async function fileExists(filename: string): Promise<boolean> {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error; // Unexpected error
    }
  }
}

export async function writeJson<T>(path: string, data: T): Promise<void> {
  try {
    await Deno.writeTextFile(path, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to write to file', path);
  }
}

export async function readJson<T>(path: string): Promise<T | null> {
  try {
    const fileContent = await Deno.readTextFile(path);
    return (fileContent ? JSON.parse(fileContent) : null) as T;
  } catch {
    console.warn('Failed to read or parse file', path);
    return null;
  }
}