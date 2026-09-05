import { test, expect, chromium } from "@playwright/test";
import { resolve } from "node:path";

// Chromium's extension API needs a persistent context and the full browser binary.
test("packaged new-tab extension boots offline and registers a scoped YouTube referrer", async ({
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Playwright only supports Chromium extension loading",
  );
  const extensionPath = resolve("build");
  const context = await chromium.launchPersistentContext("", {
    channel: "chromium",
    headless: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });
  try {
    await context.route(/^https:\/\//, (route) => route.abort());
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("chrome://newtab/");
    await expect(
      page.getByRole("button", { name: "Start", exact: true }),
    ).toBeVisible();
    const rules = await page.evaluate(() =>
      chrome.declarativeNetRequest.getSessionRules(),
    );
    const extensionId = await page.evaluate(() => chrome.runtime.id);
    expect(rules).toHaveLength(1);
    expect(rules[0].condition.initiatorDomains).toEqual([extensionId]);
    expect(rules[0].action.requestHeaders?.[0].value).toBe(
      `https://xp-newtab.${extensionId}/`,
    );
    await expect(page.locator("body")).toHaveCSS(
      "background-image",
      /assets\/images\/bliss.jpg/,
    );
    expect(
      await page.evaluate(async () => {
        const image = new Image();
        image.src = "./assets/images/bliss.jpg";
        await image.decode();
        return image.naturalWidth;
      }),
    ).toBeGreaterThan(0);
    await page.getByRole("button", { name: "Start", exact: true }).click();
    await page.locator('[data-cy="edit-mode-menu-item"]').click();
    await page.getByRole("button", { name: "Start", exact: true }).click();
    await page
      .locator('[data-cy="window-title-edit-0"]')
      .fill("Saved extension desktop");
    await page.reload();
    await expect(page.locator('[data-cy="window-title-display-0"]')).toHaveText(
      "Saved extension desktop",
    );
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test("live extension embed sends the required referrer header", async ({
  browserName,
}) => {
  test.skip(
    browserName !== "chromium" || !process.env.LIVE_YOUTUBE,
    "Opt-in network verification: LIVE_YOUTUBE=1",
  );
  const extensionPath = resolve("build");
  const context = await chromium.launchPersistentContext("", {
    channel: "chromium",
    headless: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });
  try {
    const page = await context.newPage();
    await page.goto("chrome://newtab/");
    await expect(
      page.getByRole("button", { name: "Start", exact: true }),
    ).toBeVisible();
    const extensionId = await page.evaluate(() => chrome.runtime.id);
    await page.getByRole("button", { name: "Start", exact: true }).click();
    await page.locator('[data-cy="edit-mode-menu-item"]').click();
    await page.getByRole("button", { name: "Start", exact: true }).click();
    await page.locator('[data-cy="youtube video-option-0"]').click();
    const requestPromise = context.waitForEvent("requestfinished", (request) =>
      request.url().startsWith("https://www.youtube.com/embed/"),
    );
    await page.locator('[data-cy="add-component-button-0"]').click();
    const request = await requestPromise;
    const headers = await request.allHeaders();
    expect(headers.referer).toBe(`https://xp-newtab.${extensionId}/`);
    const response = await request.response();
    expect(response?.status()).toBe(200);
  } finally {
    await context.close();
  }
});
