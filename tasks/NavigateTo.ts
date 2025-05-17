import { Actor } from '../actors/Actor';
import { Task } from './Task';

export default class NavigateTo extends Task {
    private url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    async performAs(actor: Actor): Promise<void> {
        await actor.browserPage.goto(this.url);
    }
}
