import { test, expect } from '@playwright/test';

test.describe('Café Wagner Migration Visual Tests', () => {
    test('header section visual comparison', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('header.nav')).toBeVisible();
        await expect(page).toHaveScreenshot('header.png', {
            clip: { x: 0, y: 0, width: 1280, height: 80 }
        });
    });

    test('hero section visual comparison', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('section#home.hero')).toBeVisible();
        await expect(page).toHaveScreenshot('hero.png', {
            clip: { x: 0, y: 80, width: 1280, height: 830 }
        });
    });

    test('about section visual comparison', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('section#geschichte')).toBeVisible();
        await expect(page.locator('section#geschichte')).toHaveScreenshot('about.png');
    });

    test('menu section visual comparison', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('section#speisekarte')).toBeVisible();
        await expect(page.locator('section#speisekarte')).toHaveScreenshot('menu.png');
    });

    test('gallery section visual comparison', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('section#galerie')).toBeVisible();
        await expect(page.locator('section#galerie')).toHaveScreenshot('gallery.png');
    });

    test('reservation section visual comparison', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('section#reservierung')).toBeVisible();
        await expect(page.locator('section#reservierung')).toHaveScreenshot('reservation.png');
    });

    test('footer visual comparison', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('footer.footer')).toBeVisible();
        await expect(page.locator('footer.footer')).toHaveScreenshot('footer.png');
    });

    test('full page responsive - mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await expect(page).toHaveScreenshot('mobile-full.png', { fullPage: true });
    });
});
