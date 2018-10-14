import React from 'react';
import styled, { Styles } from 'styled-components';
import { Tag } from './parser';
import { ParseError } from './store';

const TagItem = styled.span`
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    background: darkslategray;
    color: white;
    padding: 0.25rem;
    margin: 0.25rem;
    display: inline-block;
`;

const TagType = styled.span`
    border-bottom: 2px solid lightgoldenrodyellow;
    color: lightgoldenrodyellow;
    font-weight: bold;
`;

const PreContainer = styled.pre`
    margin: 1rem 0;
    font-family: Georgia, sans-serif;
    font-size: 18px;
    white-space: pre-wrap;
    overflow: auto;

    background: #cfe6d9;
    padding: 0.5rem;
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
            return (
                <PreContainer
                    style={{
                        color: 'red',
                        ...this.props.style,
                    }}
                >
                    {`Location: ${error.start.line}:${error.start.column}`}
                    {`\n${error.message}`}
                </PreContainer>
            );
        }

        return (
            <PreContainer style={this.props.style}>
                {items.map(item => {
                    if (typeof item === 'string') {
                        return item as string;
                    }

                    return (
                        <TagItem key={item.id}>
                            {item.name}
                            {': '}
                            <TagType>{item.type || 'string'}</TagType>
                        </TagItem>
                    );
                })}
            </PreContainer>
        );
    }
}
