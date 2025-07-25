import { defineConfig, devices } from '@playwright/test'
import { nxE2EPreset } from '@nx/playwright/preset'

import { workspaceRoot } from '@nx/devkit'

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:3007'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

// Timeout per test. This timeout includes the time the cluster and daemons
// take to get setup.
const timeout = 180_000

// Ensure default timeout is high enough because it is running against next
// dev mode which requires compilation the first to a page is visited.
const operationTimeout = 30_000

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  reporter: process.env.CI ? 'blob' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: operationTimeout,
  },
  timeout,
  expect: {
    timeout: operationTimeout,
  },
  outputDir: 'output',
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'bunx nx serve renterd',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  // Docs recommend 1 worker on CI: https://playwright.dev/docs/ci#workers
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write'],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          firefoxUserPrefs: {
            'dom.events.asyncClipboard.readText': true,
            'dom.events.testing.asyncClipboard': true,
          },
        },
      },
    },
    // webkit tests are extremely flaky only on CI.
    // Disable them for now and continue to investigate.
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
})
