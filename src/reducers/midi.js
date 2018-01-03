import * as types from '../constants/actionTypes'
import devices from '../constants/deviceDefinitions'
import initialState from './initialState'

export default function midiReducer(state = initialState.midi, action) {
    switch (action.type) {
        case types.MIDI_ADD_INPUT_DEVICE:
            return Object.assign(
                {},
                state,
                {
                    inputDevices: [
                        ...state.inputDevices,
                        action.device
                    ]
                }
            )
        case types.MIDI_SELECT_INPUT_DEVICE:
            return Object.assign(
                {},
                state,
                {
                    inputDevices:
                        state.inputDevices.map((device, index) => {
                            if (index === action.deviceId) {
                                device.onmidimessage = action.callback
                            } else {
                                device.onmidimessage = null
                            }
                            return device
                        })

                }
            )
        case types.MIDI_CONFIGURE_INPUTS:
            return Object.assign(
                {},
                state,
                {
                    inputInterface: devices[action.manufacturer][action.name]
                }
            )
        default:
            return state
    }
}
