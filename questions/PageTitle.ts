import { Actor } from '../actors/Actor';
import { Question } from './Question';

export default class PageTitle extends Question<string> {
    async answeredBy(actor: Actor): Promise<string> {
        return await actor.browserPage.title();
    }
}
