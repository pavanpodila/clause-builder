import { inject, observer } from 'mobx-react';
import React from 'react';
import styled, { Styles } from 'styled-components';
import { ClauseStore } from './store';

const TextBlock = styled.textarea`
    width: 100%;
    font-family: 'PT Mono', 'Courier New', monospace;
    font-size: 18px;
    box-sizing: border-box;
    margin: 0;
    padding: 0.5rem;
`;

@inject('store')
@observer
export class Clause extends React.Component<{ store?: ClauseStore; style?: Styles }> {
    public render() {
        return (
            <TextBlock
                rows={5}
                onChange={this.setText}
                value={this.props.store!.currentText}
                style={this.props.style}
            />
        );
    }

    private setText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { store } = this.props;
        return store!.setText(event.target.value);
    };
}
