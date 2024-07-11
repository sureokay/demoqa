import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import uiPages from "../utils/uiPages";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const username = process.env.APP_USERNAME!;
const password = process.env.APP_PASSWORD!;

async function globalSetup (config: FullConfig) {
    const {baseURL, storageState} = config.projects[0].use;
    const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  await page.goto(baseURL+uiPages.login);
  await loginPage.login(username, password);
  //await loginPage.checkLoggedIn();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;