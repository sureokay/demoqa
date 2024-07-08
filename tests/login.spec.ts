import { test, expect, chromium, Browser, Page } from '@playwright/test';
//import { maximizeWindow } from '../utils/utils';  // Adjust the path as necessary
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

test.beforeEach(async ({ page }) => {
    await page.goto(pages.loginPage);
    loginPage = new LoginPage(page);
});

test.describe('login functionalities', () => {
    test("Page loads", async () => {
        const title = await loginPage.getTitle();
        expect(title).toBe("DEMOQA");
    });
    
    test("Successful login", async () => {
        await loginPage.login(username, password);

        // Check for the username value
        const usernameValue = await loginPage.getUsernameValue();
        expect(usernameValue).toBe('bdesai');
    });

    test("Login failed - invalid username", async () => {
        await loginPage.login(invalidUsername, password);
        await loginPage.checkInvalidCredentials();
    });

    test("Login failed - invalid password", async () => {
        await loginPage.login(username, invalidPassword);
        await loginPage.checkInvalidCredentials();
    });
});