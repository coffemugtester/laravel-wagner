import { test, expect } from '@playwright/test';

test.describe('Header Comparison', () => {
    test('compare header section between original and Laravel', async ({ page, browser }) => {
        // Create two contexts/pages
        const context1 = await browser.newContext();
        const context2 = await browser.newContext();

        const originalPage = await context1.newPage();
        const laravelPage = await context2.newPage();

        // Navigate to both versions
        await originalPage.goto('http://localhost:5175/');
        await laravelPage.goto('http://127.0.0.1:8001/');

        // Wait for headers to be visible
        await originalPage.waitForSelector('header.nav');
        await laravelPage.waitForSelector('header.nav');

        // Take screenshots of the header
        await originalPage.locator('header.nav').screenshot({
            path: 'tests/playwright/screenshots/original-header.png'
        });
        await laravelPage.locator('header.nav').screenshot({
            path: 'tests/playwright/screenshots/laravel-header.png'
        });

        // Get computed styles for comparison
        const originalStyles = await originalPage.evaluate(() => {
            const header = document.querySelector('header.nav');
            const logo = header?.querySelector('.logo');
            const nav = header?.querySelector('nav');
            const link = nav?.querySelector('a');

            const getStyles = (el: Element | null) => {
                if (!el) return null;
                const computed = window.getComputedStyle(el);
                return {
                    fontFamily: computed.fontFamily,
                    fontSize: computed.fontSize,
                    fontWeight: computed.fontWeight,
                    letterSpacing: computed.letterSpacing,
                    color: computed.color,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            return {
                logo: getStyles(logo),
                link: getStyles(link),
            };
        });

        const laravelStyles = await laravelPage.evaluate(() => {
            const header = document.querySelector('header.nav');
            const logo = header?.querySelector('.logo');
            const nav = header?.querySelector('nav');
            const link = nav?.querySelector('a');

            const getStyles = (el: Element | null) => {
                if (!el) return null;
                const computed = window.getComputedStyle(el);
                return {
                    fontFamily: computed.fontFamily,
                    fontSize: computed.fontSize,
                    fontWeight: computed.fontWeight,
                    letterSpacing: computed.letterSpacing,
                    color: computed.color,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            return {
                logo: getStyles(logo),
                link: getStyles(link),
            };
        });

        console.log('\n=== ORIGINAL STYLES ===');
        console.log('Logo:', originalStyles.logo);
        console.log('Link:', originalStyles.link);

        console.log('\n=== LARAVEL STYLES ===');
        console.log('Logo:', laravelStyles.logo);
        console.log('Link:', laravelStyles.link);

        await context1.close();
        await context2.close();
    });
});
