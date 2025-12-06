import { test, expect, Locator, Page } from '@playwright/test';
import { PageActions } from '../actions/PageActions';
import { PageAssertions } from '../actions/PageAssertions';



export class LoginPage {
    readonly page: Page;
    readonly actions: PageActions;
    readonly assertions: PageAssertions;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly logguedAsText: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.actions = new PageActions(page);
        this.assertions = new PageAssertions(page);

        //Locators
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.loginButton = page.locator('//input[@value="Log in"]');
        this.logguedAsText = page.locator('//a[normalize-space()="ziedhannachi0@gmail.com"]');
        this.errorMessage = page.locator('//span[contains(text(),"Login was unsuccessful. Please correct the errors ")]');
    }

    async login(email: string, password: string) {

        await this.actions.fill(this.emailInput, email);
        await this.actions.fill(this.passwordInput, password);
        await this.actions.click(this.loginButton);

    }

    async assertLoginSuccess() {
        await this.assertions.expectVisible(this.logguedAsText);
    }

    async assertLoginFail() {
        await this.assertions.expectVisible(this.errorMessage);
    }
}