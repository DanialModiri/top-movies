
import axios from 'axios'
import { FETCH_MOVIES, FETCHING_MOVIES, FETCH_SINGLE_MOVIE, LOADING } from '../actionTypes/moveis';
import { EXTERNAL_SERVER } from '../../config';
import Axios from 'axios';

export const fetchMovies = (query, force) => {
    return async dispatch => {
        dispatch({ type: FETCHING_MOVIES })
        const movies = await axios.get(EXTERNAL_SERVER + '/', { params: query }).then(res => res.data);
        console.log(movies);
        dispatch({ type: FETCH_MOVIES, payload: { ...movies, query, force } });
    }
}

export const fetchSingleMovie = (title) => {
    return async (dispatch, state) => {
        dispatch({ type: LOADING, payload: true })
        const movie = await Axios.get(EXTERNAL_SERVER + '/movie/' + title).then(res => res.data);
        dispatch({ type: FETCH_SINGLE_MOVIE, payload: movie });
        dispatch({ type: LOADING, payload: false });
    }
}