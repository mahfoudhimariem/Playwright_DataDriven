import { test } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';
import ENV from '../utils/config';
import { Logger } from '../utils/logger';

const env = (process.env.ENV as 'recette' | 'preprod' | 'prod') || 'recette';
//const CONFIG = ENV[env];
const CONFIG = ENV['prod'];

test.describe('Automation Login', () => {

  test('Successful login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto(`${CONFIG.baseURL}/login`);
    Logger.info(`Logging in with user: ${CONFIG.email}`);
    await login.login(CONFIG.email, CONFIG.password);
    Logger.info('Login successful');
  });

  test('Login fails with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto(`${CONFIG.baseURL}/login`);
     Logger.info('Attempting login with invalid user');
    await login.login('wrong@example.com', 'wrongpass');
    Logger.warn('Login failed as expected');
  });

});
