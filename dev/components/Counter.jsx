import React from 'react'

export default class Counter extends React.Component {

  constructor (props) {
    super(props)

    this.intervalId = null

    this.defaultState = {
      maxCount: 10,
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

  handleIntervalChange (evt) {
    evt.preventDefault()
    const newInterval = parseInt(evt.target.value)
    this.setState({timeout: newInterval})
  }

  doInterval() {
    this.setState({currentCount: this.state.currentCount + 1})
    if(this.state.currentCount === this.state.maxCount) {
      this.handleStopInterval()
    }
  }

  handleStartInterval () {
    this.intervalId = setInterval(this.doInterval.bind(this), this.state.timeout)
  }

  handleStopInterval () {
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  handleReset () {
    this.handleStopInterval()
    this.setState(this.defaultState)
  }

  showHideSettings () {
    this.setState({controlsVisible: !this.state.controlsVisible})
  }

  componentWillUnmount () {
    this.handleReset()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.doStartAll) {
      if (this.intervalId) {
        this.handleStopInterval()
      }
      this.setState({controlsVisible: false, currentCount: 0})
      this.handleStartInterval()
      this.props.counterVals({maxCount: this.state.maxCount, timeout: this.state.timeout})
    } else {
      this.handleStopInterval()
    }
  }

  render() {
    const controlsClass = this.state.controlsVisible ? "controls show" : "controls hide";
    return (
       <div className="counter-container" key={this.props.keyVal}>
         <div className={controlsClass}>
           Reps: <input type="number" className="reps" min="1" max="999" pattern="[0-9]*" value={this.state.maxCount} onChange={this.handleMaxChange.bind(this)} />&nbsp;
           Interval (ms): <input type="number" className="interval" min="1" max="10000" value={this.state.timeout} onChange={this.handleIntervalChange.bind(this)} />
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
