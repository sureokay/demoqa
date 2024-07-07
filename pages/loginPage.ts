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
        this.usernameInput = page.getByPlaceholder("UserName");
        this.passwordInput = page.getByPlaceholder("Password");
    }

    async open() {
        await this.page.goto("https://demoqa.com/login");
    }

    async getTitle() {
        return await this.page.title();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getUsernameValue() {
        return await this.page.locator('#userName-value').innerText();
    }

    async checkInvalidCredentials() {
        //const errorMessage = this.page.locator('#name');
        await expect(this.errorMessage).toHaveText(messages.login.invalid);
    }
}