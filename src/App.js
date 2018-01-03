import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as midiActions from './actions/midi'

import Button from './components/Button'
import Knob from './components/Knob'
import { KNOB, BUTTON } from './constants/deviceDefinitions'

class App extends Component {

    constructor(props) {
        super(props)
        this.typeLookup = {
            144: 'note on',
            128: 'note off',
            176: 'twiddle'
        }
    }

    onMidiMessage = ({data}) => {
        const command = data[0] >> 4
        const channel = data[0] & 0xf
        const type = data[0] & 0xf0
        const note = data[1]
        const velocity = data[2]

        console.log(`${this.typeLookup[type]} channel ${channel}, command: ${command}, note: ${note}, velocity: ${velocity}`)
    }

    componentDidMount() {
        if (navigator.requestMIDIAccess()) {
            navigator.requestMIDIAccess({"sysex": true})
            .then(access => {
                const inputs = access.inputs.values()
                // Iterator!!
                for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
                    if (~input.value.name.indexOf('Midi Through')) {
                        continue
                    }
                    this.props.midiActions.addInputDevice(input)
                }
                this.props.midiActions.selectInputDevice(0, this.onMidiMessage)
            })
        } else {
            console.log("Sorry, MIDI is not supported on your browser")
        }
    }

    generateControllerInterface = () => {
        const inputInterface = this.props.midi.inputInterface
        const controller = [...Array(inputInterface.rows)].map(i => Array(inputInterface.columns))
        Object.keys(inputInterface.inputs).forEach(note => {
            const input = inputInterface.inputs[note]
            let component
            if (input.type === BUTTON) {
                component = <Button note={note} />
            } else if (input.type === KNOB) {
                component = <Knob note={note} />
            }
            controller[input.row][input.column] = (
                <div
                    key={note}
                    style={{
                        display: 'inline-block',
                        margin: '0.5em'
                    }}
                >
                    {component}
                    <select name={`input_${note}`}>
                        <option>Poop</option>
                    </select>
                </div>
            )

        })
        return controller
    }

    render() {
        const controllerInterface = this.generateControllerInterface()
        return (
            <div>
                <h1>Rarr</h1>
                {controllerInterface.map((row, idx) => {
                    return (<div key={idx}>{row}</div>)
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        midi: state.midi
    }
}

function mapDispatchToProps(dispatch) {
    return {
        midiActions: bindActionCreators(midiActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
