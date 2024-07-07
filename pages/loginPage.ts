import { expect, Page } from '@playwright/test';
import messages from '../utils/messages';

export class LoginPage {
    constructor(private page: Page) {}

    async open() {
        await this.page.goto("https://demoqa.com/login");
    }

    async getTitle() {
        return await this.page.title();
    }

    async login(username: string, password: string) {
        const usernameInput = this.page.locator('#userName');
        const passwordInput = this.page.locator('#password');
        const loginButton = this.page.locator('#login');

        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
    }

    async getUsernameValue() {
        return await this.page.locator('#userName-value').innerText();
    }

    async checkInvalidCredentials() {
        const errorMessage = this.page.locator('#name');
        await expect(errorMessage).toHaveText(messages.login.invalid);
    }
}