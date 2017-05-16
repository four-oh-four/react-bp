import React from 'react'

export default class QtyBtn extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      keyVal: 0
    }
  }

  changeQty (evt) {
    this.props.onChangeQty(this.props.btnType)
  }

  render() {
    const iconClass = this.props.btnType == "dec" ? "fa fa-minus" : "fa fa-plus"
    const titleStr = this.props.btnType == "dec" ? "Remove the last Counter" : "Add a new Counter"

    return (
       <div onClick={this.changeQty.bind(this)} className="qty-btn" key={this.props.keyVal} title={titleStr}>
          <i className={iconClass}></i>
       </div>
    )
  }
}
