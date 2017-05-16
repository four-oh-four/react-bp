import React from 'react'

import Counter from './Counter.jsx'
import QtyBtn from './QtyBtn.jsx'
import StartAllBtn from './StartAllBtn.jsx'

export default class App extends React.Component {

  constructor (props) {
    super(props)

    this.decreaseQty = this.decreaseQty.bind(this)
    this.increaseQty = this.increaseQty.bind(this)
    this.handleStartAll = this.handleStartAll.bind(this)

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
    if (newQty < 11) {
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
    console.log('App.handleStartAll!')
    this.setState({startAll: true})
  }

  handleStartAllDone () {
    console.log('App.handleStartAllDone!')
    this.setState({startAll: false})
  }

  render() {
    return (
     <div id="container">

        <h1>Counter Exercise</h1>

        {[...Array(this.state.numCounters)].map((x, i) =>
          <Counter keyVal={i} doStartAll={this.state.startAll} startAllDone={this.handleStartAllDone.bind(this)} />
        )}

        <div className="qty-btns-wrapper">
          <QtyBtn onClick={this.decreaseQty} btnType="dec" keyVal="qtyDec" onChangeQty={this.handleQtyChange.bind(this)} />
          <QtyBtn onClick={this.increaseQty} btnType="inc" keyVal="qtyInc" onChangeQty={this.handleQtyChange.bind(this)} />
          <StartAllBtn doStartAll={this.handleStartAll} keyVal="startBtn" />
        </div>

      </div>);
  }
}
