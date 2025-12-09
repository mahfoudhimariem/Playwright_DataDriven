import { expect, Locator, Page } from '@playwright/test';
import { PageActions } from '../../actions/PageActions';
import { PageAssertions } from '../../actions/PageAssertions';

export class CheckoutPage {
    readonly page: Page;
    readonly actions: PageActions;
    readonly assertions: PageAssertions;
    readonly adressSelector: Locator;
    readonly countryOption: Locator;
    readonly cityInput: Locator;
    readonly addressInput: Locator;
    readonly ZIPInput: Locator;
    readonly numberInput: Locator;
    readonly continueButton: Locator;
    readonly shippingAdress: Locator;
    readonly shippingMethodOption: Locator;
    readonly shippingMethodContinueButton: Locator;
    readonly paymentMethodOption: Locator;
    readonly paymentMethodContinueButton: Locator;
    readonly paymentInfoContinueButton: Locator;
    readonly confirmOrderButton: Locator
    readonly orderConfirmationMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.actions = new PageActions(page);
        this.assertions = new PageAssertions(page);

        this.adressSelector = page.locator('#billing-address-select');
        this.countryOption = page.locator('#BillingNewAddress_CountryId');
        this.cityInput = page.locator('#BillingNewAddress_City');
        this.addressInput = page.locator('#BillingNewAddress_Address1');
        this.ZIPInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.numberInput = page.locator('#BillingNewAddress_PhoneNumber');
        this.continueButton = page.locator('//input[@onclick="Billing.save()"]');
        this.shippingAdress = page.locator('//input[@onclick="Shipping.save()"]');
        this.shippingMethodOption = page.locator('#shippingoption_1');
        this.shippingMethodContinueButton = page.locator('//input[@onclick="ShippingMethod.save()"]');
        this.paymentMethodOption = page.locator('#paymentmethod_1');
        this.paymentMethodContinueButton = page.locator('//input[@onclick="PaymentMethod.save()"]');
        this.paymentInfoContinueButton = page.locator('//input[@onclick="PaymentInfo.save()"]');
        this.confirmOrderButton = page.locator('//input[@value="Confirm"]');
        this.orderConfirmationMessage = page.locator('//strong[normalize-space()="Your order has been successfully processed!"]');
    }

    async billingAddress(city: string, zip: string, phone: string, address: string) {

        this.actions.selectOption(this.adressSelector, "New adress");
        this.actions.selectOption(this.countryOption, "Tunisia");
        this.actions.fill(this.cityInput, city);
        this.actions.fill(this.addressInput, address);
        this.actions.fill(this.ZIPInput, zip);
        this.actions.fill(this.numberInput, phone);
        this.actions.click(this.continueButton);
    }

    async shippingAddress() {

        this.actions.click(this.shippingAdress);
    }

    async shippingMethod() {

        this.actions.selectOption(this.shippingMethodOption, "Next Day Air (0.00)");
        this.actions.click(this.shippingMethodContinueButton);
    }

    async payment() {
        this.actions.selectOption(this.paymentMethodOption, "Check / Money Order");
        this.actions.click(this.paymentMethodContinueButton);
        this.actions.click(this.paymentInfoContinueButton);
    }

    async confirmOrder() {
        this.actions.click(this.confirmOrderButton);
        this.assertions.expectVisible(this.orderConfirmationMessage);
}
}