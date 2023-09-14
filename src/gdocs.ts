/**
 * Create a blob to be used in Google Docs
 */
export function createBlob(origin: string, params: string) {
  return new Blob([
    `<meta charset="utf-8"><b><a href="https://recipe.ink0rr.dev/${params}" style="text-decoration:none;"><span><span>&hairsp;<img src="${origin}/${params}"></span></span></a></b>`,
  ], { type: "text/html" });
}
