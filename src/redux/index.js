

import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import thunk from './middlewares/thunk'

export default createStore(reducers, applyMiddleware(thunk));