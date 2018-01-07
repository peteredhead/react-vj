import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class OutputWindow extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.popup = null
  }

  componentDidMount() {
    this.popup = window.open(
        '',
        'ReactVJ',
        'width=1024,height=768,left=400,top=100,menubar=0'
    )
    this.popup.document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    this.popup.close()
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default OutputWindow
