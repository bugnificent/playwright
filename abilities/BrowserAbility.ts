import {type Browser, type Page } from '@playwright/test';
import { Ability } from './Ability';
import { Actor } from '../actors/Actor';

export class BrowserAbility extends Ability {
    private browser: Browser;
    private page: Page;

    constructor(browser: Browser) {
        super();
        this.browser = browser;
    }

    async performAs(actor: Actor): Promise<void> {
        this.page = await this.browser.newPage();
        actor.browserPage = this.page;
    }

    async close(): Promise<void> {
        await this.page.close();
    }

    get browserPage(): Page {
        return this.page;
    }
}
