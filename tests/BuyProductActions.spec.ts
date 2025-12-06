import { test, expect } from '@playwright/test';
import { PageActions } from '../actions/PageActions';
import { AddProductPage } from '../pages/AddProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import productData from '../data/productData.json';
import loginData from '../data/loginData.json';

import ENV from '../utils/config';
const env = (process.env.ENV as 'recette' | 'preprod' | 'prod') || 'recette';
const CONFIG = ENV['prod'];

test.describe('Buy product Actions', () => {

    test('Devrait se connecter, ajouter un produit et compléter le processus de commande avec succès', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const addProductPage = new AddProductPage(page);
        const checkoutPage = new CheckoutPage(page);
        const actions = new PageActions(page);

        await homePage.goto(CONFIG.baseURL);
        await loginPage.login(loginData.validUser.email, loginData.validUser.password);
        await loginPage.assertLoginSuccess();

        // 3. Sélectionner et Personnaliser le Produit
        await addProductPage.productSelection();
        await addProductPage.customizeAndAddProductToCart();

        // 4. Aller au panier et passer à la caisse (Checkout)
        await addProductPage.ShoppingCart();

        // 5. Adresse de facturation (Billing Address)
        await checkoutPage.billingAddress(
            productData.city,
            productData.zip,
            productData.phone,
            productData.address
        );

        // 6. Adresse de livraison (Shipping Address)
        await checkoutPage.shippingAddress(); 

        // 7.  livraison (Shipping Method)
        await checkoutPage.shippingMethod();
        
        // 8. Paiement
        await checkoutPage.payment();

        // 9. Confirmer la commande
        await checkoutPage.confirmOrder();
        await checkoutPage.assertions.expectVisible(checkoutPage.orderConfirmationMessage);
    });
});







