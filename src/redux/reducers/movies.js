import { FETCH_MOVIES } from "../actionTypes/moveis";


export const movies = (state = { query: {  } }, action) => {

    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}