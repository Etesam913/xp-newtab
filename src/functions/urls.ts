export function normalizeWebsiteUrl(
  input: string | null | undefined,
): string | null {
  const value = input?.trim();
  if (
    !value ||
    value === "/" ||
    (/^[./?#]/.test(value) && !value.startsWith("//"))
  )
    return null;
  try {
    const url = new URL(
      value.startsWith("//")
        ? `https:${value}`
        : /^[a-z][a-z\d+.-]*:/i.test(value)
          ? value
          : `https://${value}`,
    );
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
export function getYouTubeVideoId(input: string): string | null {
  const normalized = normalizeWebsiteUrl(input);
  if (!normalized) return null;
  const url = new URL(normalized);
  const host = url.hostname.toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);
  let id: string | null = null;
  if (host === "youtu.be") id = parts[0] ?? null;
  else if (
    [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "youtube-nocookie.com",
      "www.youtube-nocookie.com",
    ].includes(host)
  ) {
    id =
      parts[0] === "watch"
        ? url.searchParams.get("v")
        : ["embed", "shorts", "live", "v"].includes(parts[0])
          ? parts[1]
          : null;
  }
  return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
}
export function getYouTubeEmbedUrl(input: string): string | null {
  const id = getYouTubeVideoId(input);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
