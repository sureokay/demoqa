import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { maximizeWindow } from '../utils/utils';  // Adjust the path as necessary
import { LoginPage } from '../pages/loginPage';
import userData from '../data/userdata';
import { describe } from 'node:test';
import dotenv from 'dotenv';
import userdata from '../data/userdata';

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

    test("Login failed - invalid username", async ()=>{
        const invalidusername = userData.invalidUsername;
        const password = process.env.APP_PASSWORD;

        await loginPage.login(invalidusername, password!);
        await loginPage.checkInvalidCredentials();

    });
    test(`Login failed - invalid password`, async () => {
        const username = process.env.APP_USERNAME;
        const invalidPassword = userdata.invalidPassword;

        await loginPage.login(username!, invalidPassword);
        await loginPage.checkInvalidCredentials();
      });
});