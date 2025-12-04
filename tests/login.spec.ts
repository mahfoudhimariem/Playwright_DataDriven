import { test, expect } from '@playwright/test';
import { PageActions } from '../actions/PageActions';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/loginData.json'
import ENV from '../utils/config';

const env = (process.env.ENV as 'recette' | 'preprod' | 'prod') || 'recette';
//const CONFIG = ENV[env];
const CONFIG = ENV['prod'];


test.describe('Login Test', () => {

    test('Login Pass', async ({ page }) => {
        const actions = new PageActions(page);
        const loginPage = new LoginPage(page);

        actions.goto(`${CONFIG.baseURL}/login`);
        loginPage.login(loginData.validUser.email, loginData.validUser.password);
        loginPage.assertLoginSuccess();

    });

    test('Login Fail', async ({ page }) => {
        const actions = new PageActions(page);
        const loginPage = new LoginPage(page);

        actions.goto(`${CONFIG.baseURL}/login`);
        loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);
        loginPage.assertLoginFail();

    });

});
