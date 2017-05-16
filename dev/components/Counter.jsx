import React from 'react'

export default class Counter extends React.Component {

  constructor (props) {
    super(props)

    this.defaultState = {
      maxCount: 5,
      timeout: 1000,
      currentCount: 0,
      controlsVisible: false
    }

    this.state = this.defaultState
  }

  handleMaxChange (evt) {
    evt.preventDefault()
    const newMax = parseInt(evt.target.value)
    this.setState({maxCount: newMax})
  }

  handleTimeoutChange (evt) {
    evt.preventDefault()
    const newTimeout = parseInt(evt.target.value)
    this.setState({timeout: newTimeout})
  }

  doInterval() {
    this.setState({currentCount: this.state.currentCount + 1})
    if(this.state.currentCount == this.state.maxCount) {
      clearInterval(this.intervalId);
    }
  }

  handleStartInterval () {
    this.intervalId = setInterval(this.doInterval.bind(this), this.state.timeout)
  }

  handleStopInterval () {
    clearInterval(this.intervalId)
  }

  handleReset () {
    clearInterval(this.intervalId)
    this.setState(this.defaultState)
  }

  showHideSettings () {
    this.setState({controlsVisible: !this.state.controlsVisible})
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.doStartAll) {
      this.handleStartInterval()
    }
  }

  render() {
    const controlsClass = this.state.controlsVisible ? "controls show" : "controls hide";
    return (
       <div className="counter-container" key={this.props.keyVal}>
         <div className={controlsClass}>
           Reps: <input type="number" className="reps" min="1" max="999" pattern="[0-9]*" value={this.state.maxCount} onChange={this.handleMaxChange.bind(this)} />&nbsp;
           Interval (ms): <input type="number" className="interval" min="1" max="10000" value={this.state.timeout} onChange={this.handleTimeoutChange.bind(this)} />
         </div>
         <div className="output">
           <div className="start-interval-link" onClick={this.handleStartInterval.bind(this)} title="Start">
             <i className="fa fa-play-circle"></i>
           </div>
           <div className="stop-interval-link" onClick={this.handleStopInterval.bind(this)} title="Stop">
             <i className="fa fa-stop-circle"></i>
           </div>
           <div className="reset-link" onClick={this.handleReset.bind(this)} title="Reset">
             <i className="fa fa-undo"></i>
           </div>
           <div className="count-txt">Count: {this.state.currentCount}</div>
           <i className="settings fa fa-cog" title="Settings" onClick={this.showHideSettings.bind(this)}></i>
         </div>
       </div>
    )
  }
}
