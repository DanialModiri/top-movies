import { FETCH_MOVIES } from "../actionTypes/moveis";


export const movies = (state = { query: {  } }, action) => {

    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                movies: action.movies,
                query: { ...state.query, page: 1, ...action.query }
            }
        default:
            return state;
    }
}