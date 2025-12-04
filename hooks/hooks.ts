// utils/hooks.ts
import { Browser, BrowserContext, Page } from '@playwright/test';

export class Hooks {
  browser!: Browser;
  context!: BrowserContext;

  /**
   * Initialization before all tests
   */
  async beforeAll(browserInstance: Browser) {
    this.browser = browserInstance;
    this.context = await this.browser.newContext({
      viewport: { width: 1366, height: 768 },
      ignoreHTTPSErrors: true,
      recordVideo: { dir: "test-results/videos" },
    });
  }

  /**
   * After each test
   */
  async afterEach(page: Page, testName: string, status: string) {
    if (status === "failed") {
      await page.screenshot({
        path: `test-results/screenshots/${testName}.png`,
        fullPage: true
      });
    }
    await page.close();
  }

  /**
   * Cleanup after all tests
   */
  async afterAll() {
    await this.context.close();
    await this.browser.close();
  }
}
