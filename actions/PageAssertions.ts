// utils/PageAssertions.ts
import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/logger';

export class PageAssertions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectVisible(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Checking visibility for ${typeof locator === 'string' ? locator : 'locator'}`);
    await expect(element).toBeVisible();
  }

  async expectHidden(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Checking hidden for ${typeof locator === 'string' ? locator : 'locator'}`);
    await expect(element).toBeHidden();
  }

  async expectText(locator: string | Locator, text: string) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Checking text "${text}" for ${typeof locator === 'string' ? locator : 'locator'}`);
    await expect(element).toHaveText(text);
  }

  async expectEnabled(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Checking enabled for ${typeof locator === 'string' ? locator : 'locator'}`);
    await expect(element).toBeEnabled();
  }

  async expectDisabled(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Checking disabled for ${typeof locator === 'string' ? locator : 'locator'}`);
    await expect(element).toBeDisabled();
  }
}
