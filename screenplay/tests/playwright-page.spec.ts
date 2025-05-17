import { test, expect, type Browser, type Page } from '@playwright/test';
import { BaseActor } from '../actors/Actor';
import { BrowserAbility } from '../abilities/BrowserAbility';
import { NavigateTo, ClickElement, HoverElement, ScrollToElement } from '../tasks';
import { PageTitle, Url, ElementVisibility } from '../questions/index';

const URL = 'https://playwright.dev';

let tester: BaseActor;
let browser: Browser;
const apiLink = (page: Page) => page.getByRole('link', { name: 'API' });

test.beforeAll(async ({ browser: playwrightBrowser }) => {
  browser = playwrightBrowser;
});

test.beforeEach(async () => {
  tester = new BaseActor('Tester');
  const browserAbility = new BrowserAbility(browser);
  await browserAbility.performAs(tester);
  await tester.perform(new NavigateTo(URL));
});

test.afterEach(async () => {
  if (tester.browserPage) {
    await tester.browserPage.close();
  }
});

test.afterAll(async () => {
  await browser.close();
});

test.describe('Playwright Page', () => {

test('has title', async () => {
  const title = await tester.asks(new PageTitle());
  expect(title).toContain('Playwright');
});

test('get started link', async () => {
  await tester.perform(new ClickElement(page => page.getByRole('link', { name: 'Get started' })));
  const url = await tester.asks(new Url());
  await expect(url).toMatch(/.*intro/);
});

test('Check Java Page', async () => {
  await tester.perform(new HoverElement(page => apiLink(page)));
  await tester.perform(new ClickElement(page => apiLink(page)));

  const url = await tester.asks(new Url());
  await expect(url).toBe('https://playwright.dev/docs/api/class-playwright');
  
  // First scroll to the element
  await tester.perform(new ScrollToElement(page => page.getByRole('link', { name: 'Electron', exact: true })));
  
  // Then check visibility
  const isElectronVisible = await tester.asks(new ElementVisibility(page => page.getByRole('link', { name: 'Electron', exact: true })));
  await expect(isElectronVisible).toBe(true);
});

});