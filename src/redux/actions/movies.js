
import axios from 'axios'
import { FETCH_MOVIES, FETCHING_MOVIES } from '../actionTypes/moveis';

export const fetchMovies = (query) => {
    return async dispatch => {
        dispatch({ type: FETCHING_MOVIES })
        const movies = await axios.get('/', { params: query }).then();
        dispatch({ type: FETCH_MOVIES, movies, query });
    }
}