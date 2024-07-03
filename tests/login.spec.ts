import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { maximizeWindow } from '../utils/utils';  // Adjust the path as necessary
import { LoginPage } from '../pages/loginPage';
import { describe } from 'node:test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

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
    test("Page loads", async () => {
        const title = await loginPage.getTitle();
        expect(title).toBe("DEMOQA");
    });
    
    test("Successful login", async () => {
        // Use the login method from the LoginPage class
        const username = process.env.APP_USERNAME;
        const password = process.env.APP_PASSWORD;

        await loginPage.login(username!, password!);

        // Check for the username value
        const usernameValue = await loginPage.getUsernameValue();
        expect(usernameValue).toBe('bdesai');
    });
});