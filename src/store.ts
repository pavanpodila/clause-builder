import { action, observable, reaction } from 'mobx';
import { parse, Tag } from './clause-parser';
import { sampleText } from './sample';

export interface Location {
    line: number;
    column: number;
}

export class ParseError {
    constructor(public message: string, public start: Location, public end: Location) {
        this.message = message;
        this.start = start;
        this.end = end;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ClauseStore {
    @observable
    public currentText = sampleText;

    @observable.ref
    public results: Array<string | Tag> = [];

    @observable.ref
    public error?: ParseError;

    constructor() {
        reaction(
            () => this.currentText,
            text => {
                this.parseText(text);
            },
        );

        this.parseText(this.currentText);
    }

    private parseText(text: string) {
        try {
            this.results = parse(text);
            this.error = undefined;
        } catch (e) {
            const { start, end } = e.location as any;
            this.results = [];
            this.error = new ParseError(e.message, start, end);
        }
    }

    @action
    public setText(text: string) {
        this.currentText = text;
    }
}
