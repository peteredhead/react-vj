import * as types from '../constants/actionTypes'

export const addInputDevice = device => {
    return (dispatch, getState) => {
        dispatch({
            type: types.MIDI_ADD_INPUT_DEVICE,
            device: device.value
        })
    }
}

export const selectInputDevice = (deviceId, callback) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.MIDI_SELECT_INPUT_DEVICE,
            deviceId: deviceId,
            callback: callback
        })
        const state = getState()
        if (!state.midi.inputDevices[deviceId]) {
            return
        }
        const manufacturer = state.midi.inputDevices[deviceId].manufacturer
        const name = state.midi.inputDevices[deviceId].name
        dispatch({
            type: types.MIDI_CONFIGURE_INPUTS,
            manufacturer: manufacturer,
            name: name
        })
    }
}
