import { expect, Locator, Page } from '@playwright/test';
import { PageActions } from '../actions/PageActions';

export class HomePage {
  readonly page : Page;
  readonly actions: PageActions;
  readonly LoginLink : Locator;


  constructor(page : Page) {
    this.page = page;
    this.actions = new PageActions(page);
    
    this.LoginLink = page.locator('//a[normalize-space()="Log in"]');
    
  }

  async goto(baseURL: string) {
        await this.page.goto('https://demowebshop.tricentis.com/');
        await this.actions.click(this.LoginLink);

    }

    
  }

