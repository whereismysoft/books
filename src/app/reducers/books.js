import * as constants from '../constants';

const initialState = {
      // {id: '45435'},
      // {id: '65656'}
}
  
  export default function books(state = initialState, action) {
    switch (action.type) {
      case constants.ADD_BOOK: {
        return {
          ...state,
          [new Date().getTime()]: action.payload
        }
      };
      case constants.DELETE_BOOK: {
        delete state[action.payload]
        return {
          ...state
        }
      };
      case constants.UPDATE_BOOK: {
        return {
          ...state,
          [action.payload.id]: action.payload.data
        }
      }
    }
    return state
  }