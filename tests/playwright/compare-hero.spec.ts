import { test, expect } from '@playwright/test';

test.describe('Hero Section Comparison', () => {
    test('compare hero section between original and Laravel', async ({ page, browser }) => {
        const context1 = await browser.newContext();
        const context2 = await browser.newContext();

        const originalPage = await context1.newPage();
        const laravelPage = await context2.newPage();

        await originalPage.goto('http://localhost:5175/');
        await laravelPage.goto('http://127.0.0.1:8001/');

        await originalPage.waitForSelector('section#home.hero');
        await laravelPage.waitForSelector('section#home.hero');

        // Take screenshots
        await originalPage.locator('section#home.hero').screenshot({
            path: 'tests/playwright/screenshots/original-hero.png'
        });
        await laravelPage.locator('section#home.hero').screenshot({
            path: 'tests/playwright/screenshots/laravel-hero.png'
        });

        // Get computed styles for hero elements
        const originalStyles = await originalPage.evaluate(() => {
            const hero = document.querySelector('section#home.hero');
            const h1 = hero?.querySelector('h1');
            const subtitle = hero?.querySelector('.sub');
            const intro = hero?.querySelector('.intro');
            const heroCopy = hero?.querySelector('.hero-copy');

            const getStyles = (el: Element | null) => {
                if (!el) return null;
                const computed = window.getComputedStyle(el);
                return {
                    fontFamily: computed.fontFamily,
                    fontSize: computed.fontSize,
                    fontWeight: computed.fontWeight,
                    letterSpacing: computed.letterSpacing,
                    lineHeight: computed.lineHeight,
                    marginTop: computed.marginTop,
                    marginBottom: computed.marginBottom,
                    color: computed.color,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            const getBoundingBox = (el: Element | null) => {
                if (!el) return null;
                const rect = el.getBoundingClientRect();
                return {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                };
            };

            return {
                h1: {
                    styles: getStyles(h1),
                    box: getBoundingBox(h1),
                },
                subtitle: {
                    styles: getStyles(subtitle),
                    box: getBoundingBox(subtitle),
                },
                intro: {
                    styles: getStyles(intro),
                    box: getBoundingBox(intro),
                },
                heroCopy: {
                    styles: getStyles(heroCopy),
                },
                gapBetweenH1AndSubtitle: subtitle && h1 ?
                    getBoundingBox(subtitle)!.top - (getBoundingBox(h1)!.top + getBoundingBox(h1)!.height) : null,
            };
        });

        const laravelStyles = await laravelPage.evaluate(() => {
            const hero = document.querySelector('section#home.hero');
            const h1 = hero?.querySelector('h1');
            const subtitle = hero?.querySelector('.sub');
            const intro = hero?.querySelector('.intro');
            const heroCopy = hero?.querySelector('.hero-copy');

            const getStyles = (el: Element | null) => {
                if (!el) return null;
                const computed = window.getComputedStyle(el);
                return {
                    fontFamily: computed.fontFamily,
                    fontSize: computed.fontSize,
                    fontWeight: computed.fontWeight,
                    letterSpacing: computed.letterSpacing,
                    lineHeight: computed.lineHeight,
                    marginTop: computed.marginTop,
                    marginBottom: computed.marginBottom,
                    color: computed.color,
                    fontSmoothing: computed.getPropertyValue('-webkit-font-smoothing'),
                };
            };

            const getBoundingBox = (el: Element | null) => {
                if (!el) return null;
                const rect = el.getBoundingClientRect();
                return {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                };
            };

            return {
                h1: {
                    styles: getStyles(h1),
                    box: getBoundingBox(h1),
                },
                subtitle: {
                    styles: getStyles(subtitle),
                    box: getBoundingBox(subtitle),
                },
                intro: {
                    styles: getStyles(intro),
                    box: getBoundingBox(intro),
                },
                heroCopy: {
                    styles: getStyles(heroCopy),
                },
                gapBetweenH1AndSubtitle: subtitle && h1 ?
                    getBoundingBox(subtitle)!.top - (getBoundingBox(h1)!.top + getBoundingBox(h1)!.height) : null,
            };
        });

        console.log('\n=== ORIGINAL HERO ===');
        console.log('H1 Styles:', originalStyles.h1.styles);
        console.log('H1 Box:', originalStyles.h1.box);
        console.log('Subtitle Styles:', originalStyles.subtitle.styles);
        console.log('Subtitle Box:', originalStyles.subtitle.box);
        console.log('Gap between H1 and Subtitle:', originalStyles.gapBetweenH1AndSubtitle, 'px');

        console.log('\n=== LARAVEL HERO ===');
        console.log('H1 Styles:', laravelStyles.h1.styles);
        console.log('H1 Box:', laravelStyles.h1.box);
        console.log('Subtitle Styles:', laravelStyles.subtitle.styles);
        console.log('Subtitle Box:', laravelStyles.subtitle.box);
        console.log('Gap between H1 and Subtitle:', laravelStyles.gapBetweenH1AndSubtitle, 'px');

        console.log('\n=== DIFFERENCES ===');
        if (originalStyles.h1.box && laravelStyles.h1.box) {
            const heightDiff = laravelStyles.h1.box.height - originalStyles.h1.box.height;
            console.log('H1 Height Difference:', heightDiff, 'px');
        }
        if (originalStyles.gapBetweenH1AndSubtitle !== null && laravelStyles.gapBetweenH1AndSubtitle !== null) {
            const gapDiff = laravelStyles.gapBetweenH1AndSubtitle - originalStyles.gapBetweenH1AndSubtitle;
            console.log('Gap Difference:', gapDiff, 'px');
        }

        await context1.close();
        await context2.close();
    });
});
