import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './configureStore';

export default class Root extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            store: configureStore(()=> this.setState({isLoading: false})),
        };
    }
    render() {
        return (
            <Provider store={this.state.store}>
                <App store={this.state.store} />
            </Provider>
        );
    }
}
