import React, { Component } from 'react'

class Button extends Component {

    render() {
        return (
            <div
                style={{
                    width: '3em',
                    height: '3em',
                    border: '1px solid #333',
                    borderRadius: '2px',
                    backgroundColor: '#ededed'
                }}
            >
                {this.props.note}
            </div>
        )
    }
}

export default Button
