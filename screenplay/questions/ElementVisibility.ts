import { Actor } from '../actors/Actor';
import { Question } from './Question';
import { Page, Locator } from '@playwright/test';

type SelectorOrLocatorFn = string | ((page: Page) => Locator);

export default class ElementVisibility extends Question<boolean> {
    private selectorOrLocatorFn: SelectorOrLocatorFn;

    constructor(selectorOrLocatorFn: SelectorOrLocatorFn) {
        super();
        this.selectorOrLocatorFn = selectorOrLocatorFn;
    }

    async answeredBy(actor: Actor): Promise<boolean> {
        if (typeof this.selectorOrLocatorFn === 'string') {
            // Handle string selector (CSS or XPath)
            const element = await actor.browserPage.$(this.selectorOrLocatorFn);
            if (!element) return false;
            return await element.isVisible();
        } else {
            // Handle locator function
            const locator = this.selectorOrLocatorFn(actor.browserPage);
            return await locator.isVisible();
        }
    }
}
