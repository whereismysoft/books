import * as constants from '../../constants';

export function deleteBook(id) {
    return (dispatch) => dispatch({ type: constants.DELETE_BOOK, payload: id })
}

export function changeSortOrder(orderType) {
    return (dispatch) => dispatch({type: constants.CHANGE_SORT_ORDER, payload: orderType})
}