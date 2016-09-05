import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Box from './component/Box';
import configureStore from './store';

let store = configureStore();

export class DOerBox extends Component {
    render() {
        return (
            <Provider store={store}>
                <Box />
            </Provider>
        );
    }
}
