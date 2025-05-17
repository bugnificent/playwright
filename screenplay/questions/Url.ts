import { Actor } from '../actors/Actor';
import { Question } from './Question';

export default class Url extends Question<string> {
    async answeredBy(actor: Actor): Promise<string> {
        return actor.browserPage.url();
    }
}
