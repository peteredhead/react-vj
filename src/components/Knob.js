import React, { Component } from 'react'

class Knob extends Component {

    render() {
        return (
            <div
                style={{
                    width: '3em',
                    height: '3em',
                    border: '1px solid #333',
                    borderRadius: '3em',
                    backgroundColor: '#ededed'
                }}
            >
                {this.props.note}
            </div>
        )
    }
}

export default Knob
