import { expect, it } from "vitest";
import { createYouTubeReferrerRule } from "./extension";

it("identifies the app only on its own YouTube embed requests", () => {
  const rule = createYouTubeReferrerRule(
    "extension-host",
    "ncfmlogaelpnniflgipmnnglhfiifkke",
  );
  expect(rule.condition.initiatorDomains).toEqual(["extension-host"]);
  expect(rule.condition.resourceTypes).toEqual(["sub_frame"]);
  const match = new RegExp(rule.condition.regexFilter!);
  expect(match.test("https://www.youtube.com/embed/5pzM_pFNWak")).toBe(true);
  expect(match.test("https://www.youtube.com/watch?v=5pzM_pFNWak")).toBe(false);
  expect(match.test("https://evil.com/embed/5pzM_pFNWak")).toBe(false);
  expect(rule.action.requestHeaders).toEqual([
    {
      header: "Referer",
      operation: "set",
      value: "https://xp-newtab.ncfmlogaelpnniflgipmnnglhfiifkke/",
    },
  ]);
});
