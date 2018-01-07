import * as types from '../constants/actionTypes'

export const onEvent = (command, note, velocity) => {
    return (dispatch, getState) => {
        // Set the veloicity to zero on a note off event
        if (command === 8) {
            velocity = 0
        }
        const state = getState()
        if (note in state.eventHandler.noteCallbacks) {
            state.eventHandler.noteCallbacks[note].forEach(cb => {
                dispatch(cb(velocity))
            })
        }
    }
}
