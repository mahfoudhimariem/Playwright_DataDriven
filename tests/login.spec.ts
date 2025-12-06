import { test, expect } from '@playwright/test';
import { PageActions } from '../actions/PageActions';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/loginData.json'
import ENV from '../utils/config';

const env = process.env.ENV ?? 'recette' as const;
//const CONFIG = ENV[env];
const CONFIG = ENV['prod'];

test.describe('Test connexion', () => {

    test('Login Pass', async ({ page }) => {
        const actions = new PageActions(page);
        const loginPage = new LoginPage(page);

         await actions.goto(`${CONFIG.baseURL}/login`); 
      //  await actions.goto(CONFIG.baseURL);

        await loginPage.login(loginData.validUser.email, loginData.validUser.password);
        await loginPage.assertLoginSuccess();

    });

    test('Login Fail', async ({ page }) => {
        const actions = new PageActions(page);
        const loginPage = new LoginPage(page);

        await actions.goto(`${CONFIG.baseURL}/login`); 
        await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);
        await loginPage.assertLoginFail();
        


    });

});
