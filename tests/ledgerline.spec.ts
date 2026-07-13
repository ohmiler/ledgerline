import { expect, test } from "@playwright/test";

test("documentation flow remains usable and composed", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Move value/i })).toBeVisible();
  await expect(page.getByText(/fictional API for interface evaluation/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Send the request that starts the record." })).toBeVisible();

  await page.getByRole("link", { name: /open endpoint/i }).click();
  await expect(page).toHaveURL(/#create-payment$/);
  await expect(page.getByRole("heading", { name: "Create a payment" })).toBeVisible();

  const request = page.getByTestId("request-code");
  await expect(request).toContainText("curl https://api.ledgerline.test");
  await page.getByRole("tab", { name: "JavaScript" }).click();
  await expect(request).toContainText("await fetch");
  await page.getByRole("button", { name: "COPY" }).click();
  await expect(page.locator('[aria-live="polite"]')).toHaveText(/Copied request|Copy unavailable/);

  await page.keyboard.press("Tab");
  const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
  expect(["A", "BUTTON", "SUMMARY"]).toContain(focusedTag);

  if (testInfo.project.name === "mobile-360") {
    const trigger = page.getByRole("button", { name: "CONTENTS", exact: true });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Documentation sections" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  }

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);
  expect(consoleErrors).toEqual([]);

  await page.screenshot({ path: `test-results/ledgerline-${testInfo.project.name}.png`, fullPage: true });
});
