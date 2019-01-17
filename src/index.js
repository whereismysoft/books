import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/app.js';
import configureStore from './app/store/configureStore';

ReactDom.render(
    <Provider store={configureStore()}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

// book: {
    // title: @maxlength 30symblos,
    // authors: [
    //     {
    //         name: @maxlength 20 symbols,
    //         surname: @maxlength 20 symbols,
    //     }
    // ],
    // totalPages: int,
    // publishedBy: @maxlength 30symblos,
    // yearOfPublishing: 0001,
    // releaseDate: 01.01.0001,
    // ISBN: str,
    // picture: pic
// }
// features: 
    // - add book, remove book, update book params
    // - sort by header and yearOfPublishing
    // - upload book image
