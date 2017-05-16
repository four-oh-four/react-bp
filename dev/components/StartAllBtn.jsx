import React from 'react'

export default class StartAllBtn extends React.Component {

  render() {

    return (
       <div onClick={this.props.doStartAll} className="qty-btn" key={this.props.keyVal} title="Start All Counters!">
          <i className="fa fa-play"></i>
       </div>
    )
  }
}
