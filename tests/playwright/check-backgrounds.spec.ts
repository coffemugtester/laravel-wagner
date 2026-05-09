import { test } from '@playwright/test';

test('check section backgrounds', async ({ page, browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const originalPage = await context1.newPage();
    const laravelPage = await context2.newPage();

    await originalPage.goto('http://localhost:5175/');
    await laravelPage.goto('http://127.0.0.1:8001/');

    const originalBg = await originalPage.evaluate(() => {
        const sections = {
            body: document.body,
            page: document.querySelector('.page'),
            geschichte: document.querySelector('section#geschichte'),
            speisekarte: document.querySelector('section#speisekarte'),
            galerie: document.querySelector('section#galerie'),
        };

        const results: any = {};
        Object.entries(sections).forEach(([name, el]) => {
            if (el) {
                const computed = window.getComputedStyle(el);
                results[name] = {
                    backgroundColor: computed.backgroundColor,
                    color: computed.color,
                };
            }
        });
        return results;
    });

    const laravelBg = await laravelPage.evaluate(() => {
        const sections = {
            body: document.body,
            page: document.querySelector('.page'),
            geschichte: document.querySelector('section#geschichte'),
            speisekarte: document.querySelector('section#speisekarte'),
            galerie: document.querySelector('section#galerie'),
        };

        const results: any = {};
        Object.entries(sections).forEach(([name, el]) => {
            if (el) {
                const computed = window.getComputedStyle(el);
                results[name] = {
                    backgroundColor: computed.backgroundColor,
                    color: computed.color,
                };
            }
        });
        return results;
    });

    console.log('\n=== ORIGINAL BACKGROUNDS ===');
    console.log(JSON.stringify(originalBg, null, 2));

    console.log('\n=== LARAVEL BACKGROUNDS ===');
    console.log(JSON.stringify(laravelBg, null, 2));

    await context1.close();
    await context2.close();
});
