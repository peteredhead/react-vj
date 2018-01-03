import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {  composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'

let middlewares = [
    thunk
]



export default function configureStore() {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middlewares))
    )
}
