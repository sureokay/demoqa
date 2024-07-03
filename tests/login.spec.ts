import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { maximizeWindow } from '../utils/utils';  // Adjust the path as necessary
import { describe } from 'node:test';

class LoginPage {
    constructor(private page: Page) {}
    async open() {
        await this.page.goto("https://demoqa.com/login");
    }
    async getTitle() {
        return await this.page.title();
    }
}

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

test.beforeAll(async () => {
    // Launching chrome browser with browser window maximized
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await maximizeWindow(page);
    
    loginPage = new LoginPage(page);
    await loginPage.open();
});

test.afterAll(async () => {
    await browser.close();
});

describe('login functionalities', () => {
    test.only("Page loads", async () => {
        const title = await loginPage.getTitle();
        expect(title).toBe("DEMOQA");
    });
    
    test("Successful login", async () => {
        // Implement login functionality test here
    });
});