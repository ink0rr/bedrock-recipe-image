import { decode } from "https://deno.land/std@0.176.0/encoding/base64.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

export async function loadImage(path: string) {
  const bytes = await Deno.readFile(path);
  return Image.decode(bytes);
}

export function decodeImage(base64: string) {
  const bytes = decode(base64.split(",")[1]);
  return Image.decode(bytes);
}
