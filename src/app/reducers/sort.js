import * as constants from '../constants';

const initialState = {
    sortBy: 'title'
}
  
  export default function sort(state = initialState, action) {
    switch (action.type) {
      case constants.CHANGE_SORT_ORDER: {
        return {
          ...state,
          sortBy: action.payload
        }
      };
    }
    return state
  }