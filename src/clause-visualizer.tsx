import React from 'react';
import styled, { Styles } from 'styled-components';
import { Tag } from './clause-parser';
import { ParseError } from './store';

const TagItem = styled.span`
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    background: darkslategray;
    color: white;
    padding: 0.25rem;
`;

const TagType = styled.span`
    border-bottom: 2px solid lightgoldenrodyellow;
    color: lightgoldenrodyellow;
    font-weight: bold;
`;

interface Props {
    items: Array<string | Tag>;
    error?: ParseError;
    style?: Styles;
}
export class ClauseVisualizer extends React.Component<Props> {
    public render() {
        const { items, error } = this.props;

        if (error) {
            return `Failed: ${error.message}`;
        }

        return (
            <pre
                style={{
                    margin: '1rem 0',
                    fontFamily: 'Georgia',
                    fontSize: 18,
                    whiteSpace: 'pre-wrap',
                    overflow: 'auto',
                    ...this.props.style,
                }}
            >
                {items.map(item => {
                    if (typeof item === 'string') {
                        return item as string;
                    }

                    return (
                        <TagItem key={item.name}>
                            {item.name}
                            {': '}
                            <TagType>{item.type || 'string'}</TagType>
                        </TagItem>
                    );
                })}
            </pre>
        );
    }
}
