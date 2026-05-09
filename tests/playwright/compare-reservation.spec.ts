import { test, expect } from '@playwright/test';

test.describe('Reservation Section Comparison', () => {
    test('compare reservation section between original and Laravel', async ({ page, browser }) => {
        const context1 = await browser.newContext();
        const context2 = await browser.newContext();

        const originalPage = await context1.newPage();
        const laravelPage = await context2.newPage();

        await originalPage.goto('http://localhost:5175/');
        await laravelPage.goto('http://127.0.0.1:8001/');

        await originalPage.waitForSelector('section#reservierung');
        await laravelPage.waitForSelector('section#reservierung');

        // Take screenshots
        await originalPage.locator('section#reservierung').screenshot({
            path: 'tests/playwright/screenshots/original-reservation.png'
        });
        await laravelPage.locator('section#reservierung').screenshot({
            path: 'tests/playwright/screenshots/laravel-reservation.png'
        });

        // Get computed styles for reservation elements
        const originalStyles = await originalPage.evaluate(() => {
            const section = document.querySelector('section#reservierung');
            const h2 = section?.querySelector('h2');
            const caption = section?.querySelector('.caption');
            const form = section?.querySelector('.reservation-form');
            const input = form?.querySelector('input');
            const button = form?.querySelector('.button');
            const contactLine = section?.querySelector('.contact-line');

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
                    backgroundColor: computed.backgroundColor,
                    border: computed.border,
                    borderRadius: computed.borderRadius,
                    padding: computed.padding,
                    marginTop: computed.marginTop,
                    marginBottom: computed.marginBottom,
                    textAlign: computed.textAlign,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            return {
                h2: getStyles(h2),
                caption: getStyles(caption),
                form: getStyles(form),
                input: getStyles(input),
                button: getStyles(button),
                contactLine: getStyles(contactLine),
            };
        });

        const laravelStyles = await laravelPage.evaluate(() => {
            const section = document.querySelector('section#reservierung');
            const h2 = section?.querySelector('h2');
            const caption = section?.querySelector('.caption');
            const form = section?.querySelector('.reservation-form');
            const input = form?.querySelector('input');
            const button = form?.querySelector('.button');
            const contactLine = section?.querySelector('.contact-line');

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
                    backgroundColor: computed.backgroundColor,
                    border: computed.border,
                    borderRadius: computed.borderRadius,
                    padding: computed.padding,
                    marginTop: computed.marginTop,
                    marginBottom: computed.marginBottom,
                    textAlign: computed.textAlign,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            return {
                h2: getStyles(h2),
                caption: getStyles(caption),
                form: getStyles(form),
                input: getStyles(input),
                button: getStyles(button),
                contactLine: getStyles(contactLine),
            };
        });

        console.log('\n=== ORIGINAL RESERVATION ===');
        console.log('H2:', originalStyles.h2);
        console.log('Caption:', originalStyles.caption);
        console.log('Form:', originalStyles.form);
        console.log('Input:', originalStyles.input);
        console.log('Button:', originalStyles.button);
        console.log('Contact Line:', originalStyles.contactLine);

        console.log('\n=== LARAVEL RESERVATION ===');
        console.log('H2:', laravelStyles.h2);
        console.log('Caption:', laravelStyles.caption);
        console.log('Form:', laravelStyles.form);
        console.log('Input:', laravelStyles.input);
        console.log('Button:', laravelStyles.button);
        console.log('Contact Line:', laravelStyles.contactLine);

        console.log('\n=== KEY DIFFERENCES ===');

        const compareField = (name: string, orig: any, laravel: any, field: string) => {
            if (orig && laravel && orig[field] !== laravel[field]) {
                console.log(`${name} ${field}: ${orig[field]} → ${laravel[field]}`);
            }
        };

        ['h2', 'caption', 'form', 'input', 'button', 'contactLine'].forEach(key => {
            const orig = originalStyles[key as keyof typeof originalStyles];
            const laravel = laravelStyles[key as keyof typeof laravelStyles];

            ['fontWeight', 'fontSize', 'lineHeight', 'color', 'backgroundColor', 'border', 'fontSmoothing'].forEach(field => {
                compareField(key, orig, laravel, field);
            });
        });

        await context1.close();
        await context2.close();
    });
});
