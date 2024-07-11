import { expect, Locator, Page } from '@playwright/test';
import messages from '../utils/messages';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('#name');
        this.usernameInput = page.getByPlaceholder('UserName');
        this.passwordInput = page.getByPlaceholder('Password');
    }

    async getTitle() {
        return await this.page.title();
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.loginButton.click();
    }

    async getUsernameValue() {
        return await this.page.locator('#userName-value').innerText();
    }

    async checkInvalidCredentials() {
        await expect(this.errorMessage).toHaveText(messages.login.invalid);
    }
}