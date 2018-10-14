import { parse as pegParse } from './parser';

export interface Tag {
    name: string;
    id: string;
    type?: string;
}

export function parse(text: string): [string | Tag] {
    return pegParse(text) as [string | Tag];
}
