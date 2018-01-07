import * as types from '../constants/actionTypes'

export const openOutputWindow = () => {
    return (dispatch, getState) => {
        dispatch({
            type: types.OUTPUT_WINDOW_OPEN
        })
    }
}


export const closeOutputWindow = () => {
    return (dispatch, getState) => {
        dispatch({
            type: types.OUTPUT_WINDOW_CLOSE
        })
    }
}


export const fullscreenOutputWindow = () => {
    return (dispatch, getState) => {
        dispatch({
            type: types.OUTPUT_WINDOW_FULLSCREEN
        })
    }
}
