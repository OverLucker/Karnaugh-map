import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import history from 'utils/history';
import 'babel-polyfill';
import markup from 'utils/markup';

import { reducers } from 'store';
import Root from './Root';

window.HISTORY = history;

let store = null;

if (IS_PRODUCTION) {
    store = createStore(reducers);
} else {
    let enhancer;

    if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
        enhancer = compose(
            window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
        );
    }

    store = createStore(
        reducers,
        enhancer
    );
}


markup();

ReactDOM.render(
    <Provider store={ store }>
        <Root />
    </Provider>,
    document.getElementById('app')
);
