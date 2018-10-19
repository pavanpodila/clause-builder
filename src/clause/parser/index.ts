import { parse as pegParse } from './parser';

type Operator = 'in' | '!in' | '=' | '!=' | '<' | '>' | '<=' | '>=';

interface Expression {
    field: string;
    operator: Operator;
    value: boolean | string | number;
}

export interface Query {
    source: string;
    expressions: Expression[];
}
export interface Tag {
    name: string;
    id: string;
    query: Query;
}

export function parse(text: string): [string | Tag] {
    const result = pegParse(text) as [string | Tag];

    // tslint:disable-next-line:no-console
    console.log(result);

    return result;
}
