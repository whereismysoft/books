import { connect } from "react-redux";

import {newBook, updateBook} from './actions';

import BookCreator from './component';

const MapStateToProps = state => state;

const MapDispatchToProps = (dispatch) => {
	return {
		addBook: data => dispatch(newBook(data)),
		updateCurrentBook: (data, id) => dispatch(updateBook(data, id))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(BookCreator)