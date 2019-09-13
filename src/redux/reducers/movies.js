import { FETCH_MOVIES, FETCH_SINGLE_MOVIE } from "../actionTypes/moveis";


export const movies = (state = { query: { page: 1 } }, action) => {

    switch (action.type) {
        case FETCH_MOVIES:
            return { ...state, ...action.payload }
        case FETCH_SINGLE_MOVIE:
            return { ...state, single_movie: action.payload }
        default:
            return state;
    }
}