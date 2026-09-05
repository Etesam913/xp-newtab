import { describe, expect, it } from "vitest";
import { normalizeWebsiteUrl, getYouTubeEmbedUrl } from "./urls";

describe("desktop destinations", () => {
  it.each([
    ["example.com/path?q=hello", "https://example.com/path?q=hello"],
    [" https://example.com ", "https://example.com/"],
    ["http://localhost:3000", "http://localhost:3000/"],
    ["//example.com", "https://example.com/"],
  ])("normalizes %s", (input, expected) =>
    expect(normalizeWebsiteUrl(input)).toBe(expected),
  );
  it.each([
    "",
    "/",
    "../page",
    "javascript:alert(1)",
    "data:text/html,hi",
    "ftp://example.com",
    "https://",
    "https://user:password@example.com",
  ])("rejects %s", (input) => expect(normalizeWebsiteUrl(input)).toBeNull());
});
describe("YouTube URLs", () => {
  it.each([
    "https://www.youtube.com/watch?v=5pzM_pFNWak&list=example",
    "youtu.be/5pzM_pFNWak?t=30",
    "https://www.youtube.com/embed/5pzM_pFNWak",
    "https://www.youtube-nocookie.com/embed/5pzM_pFNWak",
    "https://m.youtube.com/shorts/5pzM_pFNWak",
    "https://youtube.com/live/5pzM_pFNWak",
  ])("accepts %s", (input) =>
    expect(getYouTubeEmbedUrl(input)).toBe(
      "https://www.youtube.com/embed/5pzM_pFNWak",
    ),
  );
  it.each([
    "https://evil.com/watch?v=5pzM_pFNWak",
    "https://youtube.com.evil.com/embed/5pzM_pFNWak",
    "https://youtube.com/watch?v=false",
    "https://youtube.com/playlist?list=5pzM_pFNWak",
  ])("rejects %s", (input) => expect(getYouTubeEmbedUrl(input)).toBeNull());
});
