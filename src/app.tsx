import { Observer, Provider } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Clause } from './clause';
import { ClauseVisualizer } from './clause-visualizer';
import { ClauseStore } from './store';

const store = new ClauseStore();

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Container>
                    <h3>Clause Parser</h3>
                    <pre style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                        --- Usage ---
                        {'\n'}
                        Type the text with placeholders specified as [<strong>name</strong>:
                        <strong>type</strong>
                        ]. The "type" is optional and defaults to "string".
                    </pre>

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
}
