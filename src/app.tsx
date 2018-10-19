import { Observer, Provider } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Clause } from './clause/clause';
import { ClauseVisualizer } from './clause/clause-visualizer';
import { ClauseStore, SampleType } from './clause/store';

const store = new ClauseStore();

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0.5rem;
    box-sizing: border-box;
`;

function Usage() {
    return (
        <pre
            style={{
                whiteSpace: 'pre-wrap',
                maxWidth: '100%',
                background: 'lightgoldenrodyellow',
                padding: '0.5rem',
            }}
        >
            <h4>--- Usage ---</h4>
            <ul>
                <li>
                    Type the text with placeholders specified within <strong>[</strong>{' '}
                    <strong>]</strong>
                </li>
                <li>
                    Syntax for a placeholder:
                    <strong>[ {'name'}</strong>
                    {': '}
                    <strong>{'source'}</strong>
                    {'{ '}
                    <strong>path.to.field</strong> <strong>operator</strong> <strong>value</strong>
                    {' } ]'}
                </li>
                <li>
                    Operator is one of:
                    <strong>{' =, !=, >, <, <=, >=, in, !in '}</strong>
                </li>
                <li>
                    Value is one of:
                    <strong>{' string | number | boolean '}</strong>
                </li>
            </ul>
        </pre>
    );
}

export class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Container>
                    <h3>
                        Clause Parser{' '}
                        <small>
                            <a href={'https://github.com/pavanpodila/clause-builder'}>Github</a>
                        </small>
                    </h3>

                    <Usage />

                    <Observer>
                        {() => (
                            <div>
                                {'Sample: '}
                                <select
                                    value={store.sample}
                                    onChange={this.onSampleChanged}
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    {Object.keys(store.samples).map(key => (
                                        <option value={key} key={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </Observer>

                    <Clause style={{ flex: 1 }} />

                    <Observer>
                        {() => (
                            <ClauseVisualizer
                                items={store.results}
                                error={store.error}
                                style={{ flex: 1 }}
                            />
                        )}
                    </Observer>
                </Container>
            </Provider>
        );
    }

    private onSampleChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        store.setSample(event.target.value as SampleType);
    };
}
