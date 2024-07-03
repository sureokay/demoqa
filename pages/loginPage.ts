import {Page} from "@playwright/test";

export class LoginPage{
    constructor (private page: Page) {}
        async open () {
            await this.page.goto("https://demoqa.com/login");
        }
        async getTitle () {
            return await this.page.title();
        }
}