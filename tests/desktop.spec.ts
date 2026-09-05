import { test, expect, type Page } from "@playwright/test";

const byCy = (page: Page, name: string) => page.locator(`[data-cy="${name}"]`);
async function menu(page: Page, item: string) {
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await byCy(page, item).click();
}
async function editMode(page: Page) {
  await menu(page, "edit-mode-menu-item");
  await page.getByRole("button", { name: "Start", exact: true }).click();
}
async function addComponent(page: Page, name: string) {
  await byCy(page, `${name.toLowerCase()}-option-0`).click();
  await byCy(page, "add-component-button-0").click();
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
  // Third-party media is not needed for desktop regressions.
  await page.route(/^https:\/\//, (route) => route.abort());
});

test("desktop and all three themes remain usable without external assets", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Taskbar" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS(
    "background-image",
    /assets\/images\/bliss.jpg/,
  );
  await menu(page, "settings-menu-item");
  for (const name of ["Windows 98", "Windows 7", "Windows XP"]) {
    await page.getByLabel("Windows theme").selectOption(name);
    await expect(
      page.getByRole("navigation", { name: "Taskbar" }),
    ).toBeInViewport();
    await expect(
      page.getByRole("button", { name: "Start", exact: true }),
    ).toBeVisible();
  }
  await byCy(page, "remove-background-image-button").click();
  await expect(page.locator("body")).toHaveCSS("background-image", "none");
  await byCy(page, "background-color-input").fill("#da5d5d");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(218, 93, 93)",
  );
  await byCy(page, "reset-background-image-button").click();
  await expect(page.locator("body")).toHaveCSS(
    "background-image",
    /assets\/images\/bliss.jpg/,
  );
  await byCy(page, "setting-tab-1").click();
  await byCy(page, "dragging-grid").selectOption("30px");
  await byCy(page, "setting-tab-2").click();
  await expect(byCy(page, "github-text")).toBeVisible();
  expect(errors).toEqual([]);
});

test("Windows 98 menu creates windows and icons and closes correctly", async ({
  page,
}) => {
  await page.goto("/");
  await menu(page, "settings-menu-item");
  await page.getByLabel("Windows theme").selectOption("Windows 98");
  await page
    .locator(".window")
    .filter({ hasText: "Settings" })
    .getByRole("button", { name: "Close", exact: true })
    .click();
  await menu(page, "create-window-menu-item");
  await expect(byCy(page, "window-1")).toBeVisible();
  await expect(byCy(page, "create-window-menu-item")).not.toBeVisible();
  await menu(page, "add-icon-menu-item");
  await expect(byCy(page, "add-icon-menu-item")).not.toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("iconData")!).length,
    ),
  ).toBe(2);
});

test("window drag, title, minimize, maximize, and close survive the migration", async ({
  page,
}) => {
  await page.goto("/");
  const title = byCy(page, "window-title-bar-0");
  const box = (await title.boundingBox())!;
  await page.mouse.move(box.x + 60, box.y + 10);
  await page.mouse.down();
  await page.mouse.move(box.x + 220, box.y + 110, { steps: 10 });
  await page.mouse.up();
  await expect(byCy(page, "window-0")).not.toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 30, 30)",
  );
  await editMode(page);
  await byCy(page, "window-title-edit-0").fill("My desktop");
  await editMode(page);
  await expect(byCy(page, "tab-0")).toHaveText("My desktop");
  await byCy(page, "maximize-button-0").click();
  await expect(byCy(page, "window-0")).toHaveCSS("width", "1280px");
  await byCy(page, "minimize-button-0").click();
  await expect(byCy(page, "window-0")).not.toBeVisible();
  await byCy(page, "tab-0").click();
  await expect(byCy(page, "window-0")).toBeVisible();
  await page.reload();
  await expect(byCy(page, "window-title-display-0")).toHaveText("My desktop");
  await byCy(page, "close-button-0").click();
  await expect(byCy(page, "window-0")).toHaveCount(0);
  await menu(page, "create-window-menu-item");
  await expect(byCy(page, "window-0")).toBeVisible();
});

test("text saves before blur and reloads with formatting", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await editMode(page);
  await addComponent(page, "Text");
  const editor = page.getByRole("textbox", { name: "Note text" });
  await editor.fill("Remember this note");
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("windowData")))
    .toContain("Remember this note");
  await editor.press("ControlOrMeta+a");
  await page.getByRole("button", { name: "Format Bold", exact: true }).click();
  await page.reload();
  await expect(
    page.getByText("Remember this note", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".rich-text-editor strong")).toHaveText(
    "Remember this note",
  );
  expect(errors).toEqual([]);
});

test("image controls update alignment, URL, and size", async ({ page }) => {
  await page.goto("/");
  await editMode(page);
  await addComponent(page, "Image");
  await byCy(page, "align-image-1").selectOption("right");
  await expect(byCy(page, "image-container-1")).toHaveCSS(
    "justify-content",
    "flex-end",
  );
  await byCy(page, "set-image-url-1").click();
  await byCy(page, "image-url-input-1").fill("./logo128.png");
  await byCy(page, "set-image-url-update-1").click();
  await expect(byCy(page, "image-1")).toHaveAttribute("src", "./logo128.png");
  await byCy(page, "image-back-button-1").click();
  await byCy(page, "image-size-slider-1").fill("15");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("windowData")!)[0].items[0]
            .imageWidth,
      ),
    )
    .toBe("75%");
});

test("YouTube links normalize and invalid links preserve the previous video", async ({
  page,
}) => {
  await page.goto("/");
  await editMode(page);
  await addComponent(page, "YouTube Video");
  const frame = page.locator('iframe[title="YouTube video player"]');
  await expect(frame).toHaveAttribute(
    "referrerpolicy",
    "strict-origin-when-cross-origin",
  );
  await page.getByRole("button", { name: "Change YouTube Video Url" }).click();
  await page
    .getByLabel("YouTube video URL")
    .fill("https://youtube.com/shorts/dQw4w9WgXcQ");
  await page.getByRole("button", { name: "Set Video Link" }).click();
  await expect(frame).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
  );
  await page.getByRole("button", { name: "Change YouTube Video Url" }).click();
  await page
    .getByLabel("YouTube video URL")
    .fill("https://example.com/no-video");
  await page.getByRole("button", { name: "Set Video Link" }).click();
  await expect(page.getByRole("alert")).toHaveText(
    "Enter a valid YouTube video link.",
  );
  await expect(frame).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
  );
  await expect(
    page.getByRole("link", { name: "Open on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

test("corrupt saved data does not remove the taskbar and is backed up", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("windowData", "{broken");
    localStorage.setItem("settingsData", JSON.stringify({ windowsOS: 42 }));
  });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Start", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      Object.keys(localStorage).some((key) =>
        key.startsWith("windowData.recovery."),
      ),
    ),
  ).toBe(true);
});

test("kanban changes persist and canceled drags do not crash", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await editMode(page);
  await addComponent(page, "Kanban Board");
  await page
    .getByRole("button", { name: "Add Item", exact: true })
    .last()
    .click();
  const card = page
    .getByRole("textbox")
    .filter({ hasText: "✨ This is your new item" });
  await card.fill("A new task");
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("windowData")))
    .toContain("A new task");
  await page.reload();
  await expect(
    page.getByRole("paragraph").filter({ hasText: "A new task" }),
  ).toBeVisible();
  const handles = page.locator('[aria-roledescription="sortable"]');
  await handles.last().focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("paragraph").filter({ hasText: "A new task" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("icon image proportions preserve position and bare hostnames navigate correctly", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "iconData",
      JSON.stringify([
        {
          id: 0,
          src: "./assets/image-placeholder.svg",
          title: "Example",
          xCoord: 600,
          yCoord: 90,
          redirect: "example.com/path",
        },
      ]),
    ),
  );
  await page.goto("/");
  const icon = byCy(page, "icon-0");
  const initial = (await icon.boundingBox())!;
  await editMode(page);
  await page.getByLabel("Icon image URL").fill("./logo128.png");
  await page.getByLabel("Icon title", { exact: true }).click();
  await editMode(page);
  const updated = (await icon.boundingBox())!;
  expect(updated.x).toBe(initial.x);
  expect(updated.width).toBe(initial.width);
  await expect(icon.locator("img")).toHaveCSS("width", "48px");
  const destination = page.waitForRequest("https://example.com/path");
  await icon.dblclick();
  expect((await destination).url()).toBe("https://example.com/path");
});

test("malformed note content stays isolated from the rest of the desktop", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "windowData",
      JSON.stringify([
        {
          id: 0,
          windowTitle: "Damaged note",
          xCoord: 30,
          yCoord: 30,
          hidden: false,
          isMaximized: false,
          size: { width: 480, height: 200 },
          items: [{ id: 1, componentName: "Text", editorState: "{bad-json" }],
        },
      ]),
    ),
  );
  await page.goto("/");
  await expect(page.getByRole("alert")).toHaveText(
    "This component could not load. Its saved data has been kept.",
  );
  await expect(
    page.getByRole("button", { name: "Start", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("windowData")),
  ).toContain("{bad-json");
});

test("open new tabs receive saved desktop and note edits without reload", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await editMode(page);
  await addComponent(page, "Text");
  await page.getByRole("textbox", { name: "Note text" }).fill("First version");
  const other = await context.newPage();
  await other.goto("/");
  await expect(other.getByText("First version", { exact: true })).toBeVisible();
  await page
    .getByRole("textbox", { name: "Note text" })
    .fill("Updated from another tab");
  await expect(
    other.getByText("Updated from another tab", { exact: true }),
  ).toBeVisible();
  await byCy(page, "window-title-edit-0").fill("Synchronized title");
  await expect(byCy(other, "window-title-display-0")).toHaveText(
    "Synchronized title",
  );
});
