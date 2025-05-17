import { Actor } from "../actors/Actor";

export abstract class Ability {
    abstract performAs(actor: Actor): Promise<void>;
}
