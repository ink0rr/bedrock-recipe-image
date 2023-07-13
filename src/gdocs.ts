/**
 * Create a blob to be used in Google Docs
 */
export function createBlob(origin: string, params: string) {
  // The extra space before <img> tag is required for the link to be inserted to the image
  return new Blob([
    `<meta charset="utf-8"><b style="font-weight:400"><a href="https://recipe.ink0rr.dev/${params}" style="text-decoration:none;visibility:hidden"><span style="color: #000000;vertical-align:baseline;white-space:pre;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:380px;height:168px">  <img src="${origin}/${params}" width="380" height="168" style="margin-left:0;margin-top:0"></span></span></a></b>`,
  ], {
    type: "text/html",
  });
}
