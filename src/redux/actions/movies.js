
import axios from 'axios'
import { FETCH_MOVIES, FETCHING_MOVIES, FETCH_SINGLE_MOVIE } from '../actionTypes/moveis';
import { EXTERNAL_SERVER } from '../../config';

export const fetchMovies = (query) => {
    return async dispatch => {
        dispatch({ type: FETCHING_MOVIES })
        const movies = await axios.get(EXTERNAL_SERVER + '/', { params: query }).then(res => res.data);
        console.log(movies);
        dispatch({ type: FETCH_MOVIES, payload: {...movies, ...query} });
    }
}

export const fetchSingleMovie = (title) => {
    return async (dispatch, state) => {
        const movie = state.movies.movies.find(item => item.title === title);
        dispatch({ type: FETCH_SINGLE_MOVIE, payload: movie });
    }
}