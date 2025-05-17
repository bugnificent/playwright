import { Actor } from '../actors/Actor';
import { Task } from './Task';
import { Page, Locator } from '@playwright/test';

type SelectorOrLocatorFn = string | ((page: Page) => Locator);

export default class ScrollToElement extends Task {
    private selectorOrLocatorFn: SelectorOrLocatorFn;

    constructor(selectorOrLocatorFn: SelectorOrLocatorFn) {
        super();
        this.selectorOrLocatorFn = selectorOrLocatorFn;
    }

    async performAs(actor: Actor): Promise<void> {
        if (typeof this.selectorOrLocatorFn === 'string') {
            // Handle string selector (CSS or XPath)
            const element = await actor.browserPage.$(this.selectorOrLocatorFn);
            if (element) {
                await element.scrollIntoViewIfNeeded();
            }
        } else {
            // Handle locator function
            const locator = this.selectorOrLocatorFn(actor.browserPage);
            await locator.scrollIntoViewIfNeeded();
        }
    }
}
