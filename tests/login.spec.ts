import { test, expect, chromium, Browser, Page } from '@playwright/test';

let browser: Browser;
let page: Page;

async function maximizeWindow(page: Page) {
    const session = await page.context().newCDPSession(page);
    const {windowId}= await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {
        windowId,
        bounds: { windowState: 'maximized'},
    });
}

test.beforeAll ( async () => {
    //Launching chrome browser with browser window maximized
    browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    page=await context.newPage();
    await maximizeWindow(page);
    });

test.afterAll(async () => {
    await browser.close();
});

test("login test", async () => {
    await page.goto('https://demoqa.com/login'); //setting wait time for 60 seconds did not work in this case await page.goto('https://demoqa.com/login', { timeout: 120000 }); //setting wait time for 60 seconds
    const title = await page.title();
    expect(title).toBe("DEMOQA");
});