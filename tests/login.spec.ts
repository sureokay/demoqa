import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import userData from '../data/userdata';
import pages from '../utils/pages';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const username = process.env.APP_USERNAME!;
const password = process.env.APP_PASSWORD!;
const invalidUsername = userData.invalidUsername;
const invalidPassword = userData.invalidPassword;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) :Promise<void> => {
    await page.goto(pages.loginPage, { waitUntil: 'domcontentloaded', timeout: 60000 });
    loginPage = new LoginPage(page);
});

test.describe('login functionalities', () => {
    test("Page loads", async () :Promise<void> => {
        const title = await loginPage.getTitle();
        expect(title).toBe("DEMOQA");
    });
    
    test("Successful login", async () :Promise<void> => {
        await loginPage.login(username, password);

        // Check for the username value
        const usernameValue = await loginPage.getUsernameValue();
        expect(usernameValue).toBe('bdesai');
    });

    test("Login failed - invalid username", async () :Promise<void> => {
        await loginPage.login(invalidUsername, password);
        await loginPage.checkInvalidCredentials();
    });

    test("Login failed - invalid password", async () :Promise<void> => {
        await loginPage.login(username, invalidPassword);
        await loginPage.checkInvalidCredentials();
    });
});