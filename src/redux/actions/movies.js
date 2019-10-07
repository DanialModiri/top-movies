
import axios from 'axios'
import { FETCH_MOVIES, FETCH_SINGLE_MOVIE, LOADING } from '../actionTypes/moveis';
import { EXTERNAL_SERVER } from '../../config';
import Axios from 'axios';

export const fetchMovies = (query, force) => {
    return async (dispatch, state) => {

        dispatch({ type: LOADING, payload: true })
        let movies;
        const stateQuery = (state.movies || { }).query;
        let newQuery = {}

        if(force)
            newQuery = query;
        else
            newQuery = {...stateQuery, page: 1, ...query}
        dispatch({ type: FETCH_MOVIES, payload: { query: newQuery } });
        movies = await axios.get(EXTERNAL_SERVER + '/', { params: newQuery }).then(res => res.data);
        dispatch({ type: FETCH_MOVIES, payload: { ...movies } });
        dispatch({ type: LOADING, payload: false })
        
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