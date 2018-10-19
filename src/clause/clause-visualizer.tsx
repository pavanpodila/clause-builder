import React, { Fragment } from 'react';
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

const PreContainer = styled.pre`
    margin: 1rem 0;
    font-family: Georgia, sans-serif;
    font-size: 18px;
    white-space: pre-wrap;
    overflow: auto;

    background: #cfe6d9;
    padding: 0.5rem;
`;

const Span = styled.span`
    font-size: 0.9rem;
    color: ${props => props.color || 'black'};
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
                            {' = '}
                            <Span color={'lightblue'}>{item.query.source}</Span>
                            {'{ '}
                            {join(
                                item.query.expressions.map(x => (
                                    <Span key={x.field} color={'yellow'}>
                                        {x.field} {x.operator} {literal(x.value)}
                                    </Span>
                                )),
                                <Span color={'lightgreen'}>{' and '}</Span>,
                            )}
                            {' }'}
                        </TagItem>
                    );
                })}
            </PreContainer>
        );
    }
}

function literal(value: string | number | boolean) {
    switch (typeof value) {
        case 'string':
            return `"${value}"`;
        case 'number':
            return `${value}`;
        case 'boolean':
            return `${value}`;
    }
}

function join(list: React.ReactNode[], element: React.ReactNode) {
    return list.map((x, index) => {
        return (
            <Fragment key={index}>
                {x}
                {index !== list.length - 1 ? element : null}
            </Fragment>
        );
    });
}
