import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.PW_BASE_URL || "http://localhost:8080";
const useExternal = !!process.env.PW_BASE_URL;

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html", { open: "never", outputFolder: "playwright-report" }], ["list"]],
  snapshotPathTemplate: "{testDir}/__snapshots__/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    },
  },
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    deviceScaleFactor: 1,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        deviceScaleFactor: 1,
        launchOptions: process.env.CHROMIUM_BIN
          ? { executablePath: process.env.CHROMIUM_BIN }
          : undefined,
      },
    },
  ],
  webServer: useExternal
    ? undefined
    : {
        command: "npm run dev",
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
