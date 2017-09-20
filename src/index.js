import React, {createElement} from 'react';
import {render} from 'react-dom';
import App from './app';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './app/reducer';

const {cms} = window;
const editorsRootElements = {};

const init = textareaId => {
    const textarea = document.getElementById(textareaId);
    let textareaState = undefined;
    try {
        textareaState = JSON.parse(textarea.value);
    } 
    catch({}) {}
    const rootElement = document.createElement('div');
    const store = createStore(
        reducer,
        textareaState,
        applyMiddleware(thunk, logger)
    );
    textarea.parentNode.insertBefore(rootElement, textarea);
    editorsRootElements[textareaId] = rootElement;
    store.subscribe(() => {
        const state = store.getState();
        textarea.value = JSON.stringify(state);
    });
    render(
        createElement(
            App,
            {
                store,
                endpoints: {
                    upload: '/?/admin/plugin/product_explorer/upload',
                },
            }
        ),
        rootElement
    );
    textarea.style.display = 'none';
};

const destroy = textareaId => {
    editorsRootElements[textareaId].parentNode.removeChild(editorsRootElements[textareaId]);
    textarea.style.display = '';
};

cms.filters.add('product_explorer', init, destroy);
