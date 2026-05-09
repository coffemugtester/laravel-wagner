import { test, expect } from '@playwright/test';

test.describe('Menu Section Comparison', () => {
    test('compare menu section between original and Laravel', async ({ page, browser }) => {
        const context1 = await browser.newContext();
        const context2 = await browser.newContext();

        const originalPage = await context1.newPage();
        const laravelPage = await context2.newPage();

        await originalPage.goto('http://localhost:5175/');
        await laravelPage.goto('http://127.0.0.1:8001/');

        await originalPage.waitForSelector('section#speisekarte');
        await laravelPage.waitForSelector('section#speisekarte');

        // Take screenshots
        await originalPage.locator('section#speisekarte').screenshot({
            path: 'tests/playwright/screenshots/original-menu.png'
        });
        await laravelPage.locator('section#speisekarte').screenshot({
            path: 'tests/playwright/screenshots/laravel-menu.png'
        });

        // Get computed styles for menu elements
        const originalStyles = await originalPage.evaluate(() => {
            const section = document.querySelector('section#speisekarte');
            const h2 = section?.querySelector('h2');
            const caption = section?.querySelector('.caption');
            const menuSection = section?.querySelector('.menu-section');
            const h3 = menuSection?.querySelector('h3');
            const menuType = menuSection?.querySelector('.menu-type');
            const menuItem = menuSection?.querySelector('.menu-item');
            const menuItemH4 = menuItem?.querySelector('h4');
            const menuItemP = menuItem?.querySelector('p');
            const menuItemSpan = menuItem?.querySelector('span');

            const getStyles = (el: Element | null) => {
                if (!el) return null;
                const computed = window.getComputedStyle(el);
                return {
                    fontFamily: computed.fontFamily,
                    fontSize: computed.fontSize,
                    fontWeight: computed.fontWeight,
                    letterSpacing: computed.letterSpacing,
                    lineHeight: computed.lineHeight,
                    color: computed.color,
                    marginTop: computed.marginTop,
                    marginBottom: computed.marginBottom,
                    textAlign: computed.textAlign,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            return {
                h2: getStyles(h2),
                caption: getStyles(caption),
                h3: getStyles(h3),
                menuType: getStyles(menuType),
                menuItemH4: getStyles(menuItemH4),
                menuItemP: getStyles(menuItemP),
                menuItemSpan: getStyles(menuItemSpan),
            };
        });

        const laravelStyles = await laravelPage.evaluate(() => {
            const section = document.querySelector('section#speisekarte');
            const h2 = section?.querySelector('h2');
            const caption = section?.querySelector('.caption');
            const menuSection = section?.querySelector('.menu-section');
            const h3 = menuSection?.querySelector('h3');
            const menuType = menuSection?.querySelector('.menu-type');
            const menuItem = menuSection?.querySelector('.menu-item');
            const menuItemH4 = menuItem?.querySelector('h4');
            const menuItemP = menuItem?.querySelector('p');
            const menuItemSpan = menuItem?.querySelector('span');

            const getStyles = (el: Element | null) => {
                if (!el) return null;
                const computed = window.getComputedStyle(el);
                return {
                    fontFamily: computed.fontFamily,
                    fontSize: computed.fontSize,
                    fontWeight: computed.fontWeight,
                    letterSpacing: computed.letterSpacing,
                    lineHeight: computed.lineHeight,
                    color: computed.color,
                    marginTop: computed.marginTop,
                    marginBottom: computed.marginBottom,
                    textAlign: computed.textAlign,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            return {
                h2: getStyles(h2),
                caption: getStyles(caption),
                h3: getStyles(h3),
                menuType: getStyles(menuType),
                menuItemH4: getStyles(menuItemH4),
                menuItemP: getStyles(menuItemP),
                menuItemSpan: getStyles(menuItemSpan),
            };
        });

        console.log('\n=== ORIGINAL MENU ===');
        console.log('H2 (Main Title):', originalStyles.h2);
        console.log('Caption:', originalStyles.caption);
        console.log('H3 (Section Title):', originalStyles.h3);
        console.log('Menu Type:', originalStyles.menuType);
        console.log('Menu Item H4 (Item Name):', originalStyles.menuItemH4);
        console.log('Menu Item P (Description):', originalStyles.menuItemP);
        console.log('Menu Item Span (Price):', originalStyles.menuItemSpan);

        console.log('\n=== LARAVEL MENU ===');
        console.log('H2 (Main Title):', laravelStyles.h2);
        console.log('Caption:', laravelStyles.caption);
        console.log('H3 (Section Title):', laravelStyles.h3);
        console.log('Menu Type:', laravelStyles.menuType);
        console.log('Menu Item H4 (Item Name):', laravelStyles.menuItemH4);
        console.log('Menu Item P (Description):', laravelStyles.menuItemP);
        console.log('Menu Item Span (Price):', laravelStyles.menuItemSpan);

        console.log('\n=== KEY DIFFERENCES ===');

        const compareField = (name: string, orig: any, laravel: any, field: string) => {
            if (orig && laravel && orig[field] !== laravel[field]) {
                console.log(`${name} ${field}: ${orig[field]} → ${laravel[field]}`);
            }
        };

        ['h2', 'caption', 'h3', 'menuType', 'menuItemH4', 'menuItemP', 'menuItemSpan'].forEach(key => {
            const orig = originalStyles[key as keyof typeof originalStyles];
            const laravel = laravelStyles[key as keyof typeof laravelStyles];

            ['fontWeight', 'fontSize', 'lineHeight', 'color', 'fontSmoothing'].forEach(field => {
                compareField(key, orig, laravel, field);
            });
        });

        await context1.close();
        await context2.close();
    });
});
