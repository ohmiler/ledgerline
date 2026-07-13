import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "ledgerline.spec.ts",
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4183",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npx serve out -l 4183",
    url: "http://127.0.0.1:4183",
    reuseExistingServer: false,
  },
  projects: [
    { name: "mobile-360", use: { viewport: { width: 360, height: 800 } } },
    { name: "tablet-768", use: { viewport: { width: 768, height: 900 } } },
    { name: "desktop-1280", use: { viewport: { width: 1280, height: 900 } } },
    { name: "wide-1600", use: { viewport: { width: 1600, height: 1000 } } },
  ],
});
