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
    const newMax = parseInt(evt.target.value)
    this.setState({maxCount: newMax})
  }

  handleTimeoutChange (evt) {
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
           Max count: <input type="text" size="4" value={this.state.maxCount} onChange={this.handleMaxChange.bind(this)} />&nbsp;
           Interval: <input type="text" size="7" value={this.state.timeout} onChange={this.handleTimeoutChange.bind(this)} />
         </div>
         <div className="output">
           <div className="start-interval-link" onClick={this.handleStartInterval.bind(this)}>
             <i className="fa fa-play-circle"></i>
           </div>
           <div className="stop-interval-link" onClick={this.handleStopInterval.bind(this)}>
             <i className="fa fa-stop-circle"></i>
           </div>
           <div className="reset-link" onClick={this.handleReset.bind(this)} title="Reset">
             <i className="fa fa-undo"></i>
           </div>
           <div className="count-txt">Count: {this.state.currentCount}</div>
           <i className="settings fa fa-cog" onClick={this.showHideSettings.bind(this)}></i>
         </div>
       </div>
    )
  }
}
