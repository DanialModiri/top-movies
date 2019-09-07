import { FETCHING_MOVIES, LOADING } from "../actionTypes/moveis";


export default (state = {}, action) => {
    switch (action.type) {
        case FETCHING_MOVIES:
            return { ...state, loading: true }
        case LOADING:
            return {...state, loading: action.payload}
        default:
            return state;    
    }
}