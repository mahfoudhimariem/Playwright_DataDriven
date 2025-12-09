import { expect, Locator, Page } from '@playwright/test';
import { PageActions } from '../../actions/PageActions';
import { PageAssertions } from '../../actions/PageAssertions';

export class AddProductPage {
    readonly page: Page;
    readonly actions: PageActions;
    readonly assertions: PageAssertions;
    readonly computerButton: Locator;
    readonly desktopButton: Locator;
    readonly addProductButton: Locator;
    readonly processorOption: Locator;
    readonly ramOption: Locator;
    readonly hddOption: Locator;
    readonly softwareOption: Locator;
    readonly addToCartButton: Locator;
    readonly successMessage: Locator;
    readonly shoppingCartButton: Locator;
    readonly productAddedText: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.actions = new PageActions(page);
        this.assertions = new PageAssertions(page);

        this.computerButton = page.locator('//ul[@class="top-menu"]//a[normalize-space()="Computers"]');
        this.desktopButton = page.locator('//ul[@class="top-menu"]//a[normalize-space()="Desktops"]');
        this.addProductButton = page.locator('//input[@value="Add to cart"]');
        this.processorOption = page.locator('//label[contains(text(),"Fast")]');
        this.ramOption = page.locator('//label[normalize-space()="2 GB"]');
        this.hddOption = page.locator('//label[normalize-space()="320 GB"]');
        this.softwareOption = page.locator('#product_attribute_72_8_30_93');
        this.addToCartButton = page.locator('#add-to-cart-button-72');
        this.successMessage = page.locator('//p[@class="content" and contains(text(),"The product has been added to your shopping cart")]');
        this.shoppingCartButton = page.locator('//span[normalize-space()="Shopping cart"]');
        this.productAddedText = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
    }

    async productSelection() {

        this.actions.hover(this.computerButton);
        this.actions.click(this.desktopButton)
    }

    async customizeAndAddProductToCart() {
        this.actions.click(this.addProductButton);
        this.actions.selectOption(this.processorOption, "Fast");
        this.actions.selectOption(this.ramOption, "2 GB");
        this.actions.selectOption(this.hddOption, "320 GB");
        this.actions.selectOption(this.softwareOption,"Image Viever [+5.00]");
        this.actions.click(this.addToCartButton);
        this.assertions.expectVisible(this.successMessage);
    }
    async ShoppingCart() {
        this.actions.click(this.shoppingCartButton);
        this.actions.click(this.productAddedText);
        this.actions.click(this.checkoutButton);
        
    }

}