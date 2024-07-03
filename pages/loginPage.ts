import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}

    async open() {
        await this.page.goto("https://demoqa.com/login");
    }

    async getTitle() {
        return await this.page.title();
    }

    async enterUsername(username: string) {
        const usernameInput = this.page.locator('#userName');
        await usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        const passwordInput = this.page.locator('#password');
        await passwordInput.fill(password);
    }

    async clickLoginButton() {
        const loginButton = this.page.locator('#login');
        await loginButton.click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async getSuccessMessage() {
        return this.page.locator('.success-message');
    }

    async getUsernameValue() {
        return await this.page.locator('#userName-value').innerText();
    }
}