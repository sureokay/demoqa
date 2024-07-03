import { Page } from '@playwright/test';

export async function maximizeWindow(page: Page) {
    const session = await page.context().newCDPSession(page);
    const { windowId } = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {
        windowId,
        bounds: { windowState: 'maximized' },
    });
}