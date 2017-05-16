import React from 'react'

import Counter from './Counter.jsx'

export default class App extends React.Component {

  constructor (props) {
    super(props)

    this.maxCounters = 5
    this.allCounterData = []

    this.decreaseQty = this.decreaseQty.bind(this)
    this.increaseQty = this.increaseQty.bind(this)

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
    if (changeMethod === "inc") {
      this.increaseQty()
    } else {
      this.decreaseQty()
    }
  }

  render() {
    return (
     <div id="container">

        <h1>Counter Exercise</h1>

        <Counter key="ct1" keyVal="1" />

      </div>);
  }
}
