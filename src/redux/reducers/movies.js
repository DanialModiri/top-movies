import { FETCH_MOVIES, FETCH_SINGLE_MOVIE } from "../actionTypes/moveis";


export const movies = (state = { query: {  } }, action) => {

    switch (action.type) {
        case FETCH_MOVIES:
            if(action.payload.force)
                return {...state, query: action.payload.query, movies: action.payload.movies }
            return {
                ...state,
                movies: action.payload.movies,
                query: {...state.query ,...action.payload.query}
            }
        case FETCH_SINGLE_MOVIE:
            return {...state, single_movie: action.payload}
        default:
            return state;
    }
}