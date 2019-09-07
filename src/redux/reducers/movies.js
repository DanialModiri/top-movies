import { FETCH_MOVIES, FETCH_SINGLE_MOVIE } from "../actionTypes/moveis";


export const movies = (state = { query: {} }, action) => {

    switch (action.type) {
        case FETCH_MOVIES:
            return { ...state, query: action.payload.query, movies: action.payload.movies }
        case FETCH_SINGLE_MOVIE:
            return { ...state, single_movie: action.payload }
        default:
            return state;
    }
}