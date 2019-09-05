import { FETCHING_MOVIES } from "../actionTypes/moveis";


export default (state = {}, action) => {
    switch (action.type) {
        case FETCHING_MOVIES:
            return { ...state, loading: true }
        default:
            return state;    
    }
}