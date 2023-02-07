import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";
import { decodeImage, loadImage } from "./image.ts";

const items = await fetch("https://bedrock-items.deno.dev").then((res) => res.json());
const base = await loadImage("./data/base.png");
const missing = await loadImage("./data/missing.png");

export async function createRecipeImage(inputs: string[], output: string, customItems: Record<string, string>) {
  const textures = new Map<string, Image>();
  const getItemTexture = async (id: string) => {
    if (textures.has(id)) {
      return textures.get(id)!;
    }
    if (items[id]) {
      const buffer = await fetch(`https://bedrock-items.deno.dev/${id}/texture`).then((res) => res.arrayBuffer());
      textures.set(id, await Image.decode(buffer));
    }
    if (customItems[id]) {
      textures.set(id, await decodeImage(customItems[id]));
    }
    return textures.get(id) ?? missing;
  };

  let x = 0;
  let y = 0;
  for (const input of inputs) {
    if (input) {
      const image = await getItemTexture(input);
      image.fit(48, 48);
      base.composite(image, 6 + x * 54, 6 + y * 54);
    }
    if (++x % 3 === 0) {
      x = 0;
      y++;
    }
  }

  if (output) {
    const image = await getItemTexture(output);
    image.fit(48, 48);
    base.composite(image, 300, 72);
  }

  return base;
}
