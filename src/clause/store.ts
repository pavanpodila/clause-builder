import { action, observable, reaction } from 'mobx';
import { parse, Tag } from './parser';
import { samples } from './samples';

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

export type SampleType = keyof typeof samples;

// tslint:disable-next-line:max-classes-per-file
export class ClauseStore {
    public samples = samples;

    @observable.ref
    public results: Array<string | Tag> = [];

    @observable.ref
    public error?: ParseError;

    @observable
    public sample: SampleType = 'greeting';

    @observable
    public currentText = samples[this.sample];

    constructor() {
        reaction(
            () => this.currentText,
            text => {
                this.parseText(text);
            },
        );

        reaction(
            () => this.sample,
            (sample: SampleType) => {
                this.currentText = samples[sample];
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

    public setSample(value: SampleType) {
        this.sample = value;
    }
}
