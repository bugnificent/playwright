import { Actor } from '../actors/Actor';

export abstract class Question<T> {
    abstract answeredBy(actor: Actor): Promise<T>;
}
