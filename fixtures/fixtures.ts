import { test as base, BrowserContext, Page } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * Custom test fixtures for Playwright.
 * Provides a browser context and page for each test.
 * Automatically closes context and page, and handles failures with screenshots.
 */
export const test = base.extend<{
  context: BrowserContext;
  page: Page;
}>({

  /**
   * Provides a fresh browser context for each test.
   * - Sets viewport to 1366x768
   * - Ignores HTTPS errors
   * - Records video for each test
   */
  context: async ({ browser }, use, testInfo) => {
    Logger.info(`Creating a new browser context for test: ${testInfo.title}`);
    
    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      ignoreHTTPSErrors: true,
      recordVideo: { dir: 'test-results/videos' },
    });

    try {
      await use(context); // inject context into the test
    } catch (error) {
      Logger.error(`Error in context for test "${testInfo.title}": ${error}`);
      throw error;
    } finally {
      Logger.info(`Closing browser context for test: ${testInfo.title}`);
      await context.close();
    }
  },

  /**
   * Provides a new page for each test.
   * Automatically closes the page after the test finishes.
   * Captures a screenshot if the test fails.
   */
  page: async ({ context }, use, testInfo) => {
    Logger.info(`Creating a new page for test: ${testInfo.title}`);
    const page = await context.newPage();

    try {
      await use(page);
    } catch (error) {
      Logger.error(`Test failed: ${testInfo.title}`);
      // Only take screenshot if the test failed
      if (page && !page.isClosed()) {
        const screenshotPath = `test-results/screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
        Logger.info(`Capturing screenshot: ${screenshotPath}`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
      }
      throw error;
    } finally {
      if (!page.isClosed()) {
        Logger.info(`Closing page for test: ${testInfo.title}`);
        await page.close();
      }
    }
  },

});

