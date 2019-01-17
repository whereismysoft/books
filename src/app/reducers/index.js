// for every component we can create its own reducer
// here we should import every reducer and place it inside combineReducers
// components reducers should be located in /reducers folder

import { combineReducers } from 'redux';

import books from './books';
import sort from './sort';

export default combineReducers({
    books,
    sort
})