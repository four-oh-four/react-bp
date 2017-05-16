import React from 'react'

export default class StartAllBtn extends React.Component {

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      mode: "start"
    }
  }

  handleClick () {
    if (this.state.mode == "start") {
      this.props.doStartAll()
      this.setState({mode: "stop"})
    } else {
      this.props.doStopAll()
      this.setState({mode: "start"})
    }
  }

  render() {
    let classStr = this.state.mode == "start" ? "fa-play" : "fa-stop";
    let titleStr = this.state.mode == "start" ? "Start All Counters" : "Stop All Counters"
    return (
       <div onClick={this.handleClick} className="qty-btn" key={this.props.keyVal} title={titleStr}>
          <i className={"fa " + classStr}></i>
       </div>
    )
  }
}
