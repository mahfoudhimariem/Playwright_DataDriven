// utils/PageActions.ts
import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';

export class PageActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    Logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async fill(locator: string | Locator, value: string) {
    Logger.info(`Filling ${typeof locator === 'string' ? locator : 'locator'} with value "${value}"`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(value);
  }

  async click(locator: string | Locator) {
    Logger.info(`Clicking on ${typeof locator === 'string' ? locator : 'locator'}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click();
  }

  async selectOption(locator: string | Locator, value: string) {
    Logger.info(`Selecting option "${value}" for ${typeof locator === 'string' ? locator : 'locator'}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption(value);
  }

  async hover(locator: string | Locator) {
    Logger.info(`Hovering over ${typeof locator === 'string' ? locator : 'locator'}`);
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.hover();
  }

  async waitForTimeout(ms: number) {
    Logger.info(`Waiting for ${ms} ms`);
    await this.page.waitForTimeout(ms);
  }
}
