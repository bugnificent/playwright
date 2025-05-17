import { Actor } from '../actors/Actor';

export abstract class Task {
    abstract performAs(actor: Actor): Promise<void>;
}
