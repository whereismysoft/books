import { connect } from "react-redux";

import MainPage from './component';

import { deleteBook, changeSortOrder } from './actions'

const MapStateToProps = state => {
	return {
		books: state.books,
		sortOrder: state.sort.sortBy
	}
}

const MapDispatchToProps = (dispatch) => {
	return {
		handleBookDelete: id => dispatch(deleteBook(id)),
		setSortOrder: type => dispatch(changeSortOrder(type))
	}
}

export default connect(MapStateToProps, MapDispatchToProps)(MainPage)