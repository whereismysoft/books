import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {throttle} from 'lodash';

import {loadState, saveState} from './localStorage';

import rootReducer from '../reducers/index.js'

export default function configureStore() {
	const store = createStore(
		rootReducer,
		loadState(),
		composeWithDevTools(applyMiddleware(thunk))
	);

	store.subscribe(() => {
		saveState(store.getState());
	});

	return store;
}