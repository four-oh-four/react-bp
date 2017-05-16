import React from 'react'

import Counter from './Counter.jsx'
import QtyBtn from './QtyBtn.jsx'
import StartAllBtn from './StartAllBtn.jsx'

export default class App extends React.Component {

  constructor (props) {
    super(props)

    this.maxCounters = 5
    this.allCounterData = []

    this.decreaseQty = this.decreaseQty.bind(this)
    this.increaseQty = this.increaseQty.bind(this)
    this.handleStartAll = this.handleStartAll.bind(this)
    this.handleStopAll = this.handleStopAll.bind(this)
    this.handleStartAllDone = this.handleStartAllDone.bind(this)
    this.allCounterProps = this.allCounterProps.bind(this)

    this.state = {
      numCounters: 2,
      startAll: false
    }
  }

  decreaseQty () {
    const newQty = this.state.numCounters - 1
    if (newQty > 0) {
      this.setState({numCounters: newQty})
    }
  }

  increaseQty () {
    const newQty = this.state.numCounters + 1
    if (newQty < this.maxCounters + 1) {
      this.setState({numCounters: newQty})
    }
  }

  handleQtyChange (changeMethod) {
    if (changeMethod == "inc") {
      this.increaseQty()
    } else {
      this.decreaseQty()
    }
  }

  handleStartAll () {
    this.setState({startAll: true})
  }

  handleStopAll () {
    this.setState({startAll: false})
  }

  handleStartAllDone () {
    this.allCounterData = []
    this.setState({startAll: false})
  }

  allCounterProps (counterData) {
    this.allCounterData.push(counterData)
    let maxExec = 0
    if (this.allCounterData.length == this.state.numCounters) {
      this.allCounterData.map(function(o) {
        let thisExec = o.maxCount * o.timeout
        if (thisExec > maxExec) {
          maxExec = thisExec
        }
      })
      setTimeout(this.handleStartAllDone, parseInt(maxExec + 50))
    }
  }

  render() {
    return (
     <div id="container">

        <h1>Counter Exercise</h1>

        {[...Array(this.state.numCounters)].map((x, i) =>
          <Counter key={"ct" + i} keyVal={i}
              doStartAll={this.state.startAll}
              doStopAll={this.state.startAll}
              startAllDone={this.handleStartAllDone.bind(this)}
              counterVals={this.allCounterProps} />
        )}

        <div className="qty-btns-wrapper">
          <QtyBtn
              onClick={this.decreaseQty}
              btnType="dec"
              keyVal="qtyDec"
              onChangeQty={this.handleQtyChange.bind(this)} />
          <QtyBtn
              onClick={this.increaseQty}
              btnType="inc"
              keyVal="qtyInc"
              onChangeQty={this.handleQtyChange.bind(this)} />
          <StartAllBtn
              doStartAll={this.handleStartAll}
              doStopAll={this.handleStopAll} keyVal="startBtn"
              buttonMode={this.state.startAll} />
        </div>

      </div>);
  }
}
