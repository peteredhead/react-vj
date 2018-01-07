import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as eventHandlerActions from './actions/eventHandler'
import * as midiActions from './actions/midi'
import * as outputWindowActions from './actions/outputWindow'
import Button from './components/Button'
import Knob from './components/Knob'
import OutputWindow from './components/OutputWindow'
import { KNOB, BUTTON } from './constants/deviceDefinitions'

class App extends Component {

    constructor(props) {
        super(props)
        this.typeLookup = {
            144: 'note on',
            128: 'note off',
            176: 'twiddle'
        }
        this.constainerEl = document.createElement('div')
        this.externalWindow = null
    }

    onMidiMessage = ({data}) => {
        const command = data[0] >> 4
        const channel = data[0] & 0xf
        const type = data[0] & 0xf0
        const note = data[1]
        const velocity = data[2]
        this.props.eventHandlerActions.onEvent(command, note, velocity)
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

    generatePortalInterface = () => {
        let portalButton
        if (this.props.outputWindow.open) {
            portalButton = (
                <button
                    onClick = {this.props.outputWindowActions.closeOutputWindow}
                >
                    Close Performance Window
                </button>
            )
        } else {
            portalButton = (
                <button
                    onClick = {this.props.outputWindowActions.openOutputWindow}
                >
                    Open Performance Window
                </button>
            )
        }
        return portalButton
    }

    generateContent = () => {
        return (
            <div>
                <h1>Hey!</h1>
                <p>This is working</p>
            </div>

        )
    }

    render() {
        const controllerInterface = this.generateControllerInterface()
        const portalInterface = this.generatePortalInterface()
        const content = this.generateContent()
        const portal = this.props.outputWindow.open ?  <OutputWindow>{content}</OutputWindow> : null
        return (
            <div>
                <h1>Rarr</h1>
                {content}
                {portalInterface}
                {portal}
                {controllerInterface.map((row, idx) => {
                    return (<div key={idx}>{row}</div>)
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        eventHandler: state.eventHandler,
        midi: state.midi,
        outputWindow: state.outputWindow
    }
}

function mapDispatchToProps(dispatch) {
    return {
        eventHandlerActions: bindActionCreators(eventHandlerActions, dispatch),
        midiActions: bindActionCreators(midiActions, dispatch),
        outputWindowActions: bindActionCreators(outputWindowActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
