export interface Actor {
    attemptsTo(task: any): Promise<void>;
    answers(question: any): Promise<any>;
    can(ability: any): void;
    perform(task: any): Promise<void>;
    asks(question: any): Promise<any>;
    browserPage: any;
    name: string;
}

export class BaseActor implements Actor {
    private abilities: any[] = [];
    public browserPage: any;
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    can(ability: any): void {
        this.abilities.push(ability);
    }

    async attemptsTo(task: any): Promise<void> {
        await task.performAs(this);
    }

    async answers(question: any): Promise<any> {
        return await question.answeredBy(this);
    }

    async perform(task: any): Promise<void> {
        await task.performAs(this);
    }

    async asks(question: any): Promise<any> {
        return await question.answeredBy(this);
    }
}

export const actor = (name: string): BaseActor => new BaseActor(name);