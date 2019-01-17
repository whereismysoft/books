import * as constants from '../../constants';

export function newBook(data) {
    return (dispatch) => dispatch({ type: constants.ADD_BOOK, payload: data})
}

export function updateBook(data, id) {
    return (dispatch) => dispatch({ 
        type: constants.UPDATE_BOOK,
        payload: {data, id}
    })
}
