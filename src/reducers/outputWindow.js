import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function outputWindowReducer(state = initialState.outputWindow, action) {
    switch (action.type) {
        case types.OUTPUT_WINDOW_OPEN:
            return Object.assign(
                {},
                state,
                {
                    open: true,
                    fullscreen: false
                }
            )
        case types.OUTPUT_WINDOW_CLOSE:
            return Object.assign(
                {},
                state,
                {
                    open: false,
                    fullscreen: false
                }
            )
        case types.OUTPUT_WINDOW_FULLSCREEN:
            return Object.assign(
                {},
                state,
                {
                    open: true,
                    fullscreen: true
                }
            )
        default:
            return state
    }
}
