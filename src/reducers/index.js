import { combineReducers } from 'redux'

import midi from './midi'
import outputWindow from './outputWindow'

const rootReducer = combineReducers({
    midi,
    outputWindow
})

export default rootReducer
