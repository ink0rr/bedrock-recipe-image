export function parseUrl(url: string) {
  const params = new URLSearchParams(url);
  const customItemParams = new URLSearchParams(params.get("customItems") ?? "");

  const customItems: Record<string, string> = {};
  customItemParams.forEach((value, key) => {
    customItems[atob(key)] = value;
  });

  return {
    input: atob(params.get("input") ?? "").split(","),
    output: atob(params.get("output") ?? ""),
    customItems: customItems,
  };
}
