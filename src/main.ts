import { serve } from "https://deno.land/std@0.176.0/http/server.ts";
import { cors } from "https://deno.land/x/hono@v2.7.6/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v2.7.6/mod.ts";
import { createBlob } from "./gdocs.ts";
import { createRecipeImage } from "./recipe.ts";
import { parseUrl } from "./url.ts";

export const app = new Hono();

app.use("*", cors());

app.get("/", async (ctx) => {
  const { input, output, customItems } = parseUrl(ctx.req.url);
  const image = await createRecipeImage(input, output, customItems);

  ctx.res.headers.set("Content-Type", "image/png");

  return ctx.newResponse(await image.encode(), 200);
});

app.get("/gdocs", async (ctx) => {
  const { origin, search } = new URL(ctx.req.url);
  const blob = createBlob(origin, search);

  ctx.res.headers.set("Content-Type", "text/html");

  return ctx.newResponse(await blob.text(), 200);
});

serve(app.fetch);
