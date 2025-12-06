import { test, expect } from '@playwright/test';

test.describe('Gestion Nouvelle Fenetre', () => {

    test('Gestion De Nouvelle Fenetre', async ({ page, context }) => {

        await page.goto('https://qatraining.fr/pages/features/window-focus.html');

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.click('#open-window-btn'),
        ]);

        await newPage.waitForLoadState('domcontentloaded');
        await newPage.fill('//input[@placeholder="Entrez votre texte ici"]', 'Hello World');

        await expect(newPage.locator('//input[@placeholder="Entrez votre texte ici"]')).toHaveValue('Hello World');

        await page.bringToFront();/// revenir a la page principale
        

    });
      });
