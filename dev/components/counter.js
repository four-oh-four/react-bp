import React, { Component } from 'react';
import '../index.css';

export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 1,
			endNumber:10,
			interval:1,
			counting:false
		};
		this.onSubmit = this.handleSubmit.bind(this);
		this.onChange = this.handleChange.bind(this);

	}

	handleSubmit(e){
		
		e.preventDefault();
		this.stopCount();
		let endNumber = this.state.endNumber;
		let interval = this.state.interval;
		if(this.state.counting){
			this.setState({
				counter: 1
			});
			return;
		}

		this.setState({counter:1, counting:true},()=>{this.intervalId = setInterval(() => this.startCount(endNumber), interval*1000);});
		
	}
	componentWillUnmount(){
		this.stopCount();
	}

	handleChange(e){
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}

	startCount(endNumber){
		if(this.state.counter<endNumber){
			this.setState((prevState, props) => {
				return {
					counter: prevState.counter + 1
				}
			});
		}else{
			this.stopCount();
			return;
		}

	}

	stopCount(){
		clearInterval(this.intervalId);
		this.intervalId = null;
		this.setState({
			counting:false
		});

	}

	render() {
		const counting = (this.state.counting) ? "Stop" : "Count"

		return (
			<div>
			<div className="container-fluid">
			<div className="box">
			<div className="instructions important paddingDiv">
			Print the numbers at specified interval	
			</div>
			<div className="row">

			<div className="col-md-6">
			<form onSubmit={this.handleSubmit.bind(this)}>
			<p/>Specify Max number:<input name = "endNumber"  type="number" min="1" max="1000" value={this.state.endNumber}
			onChange={this.handleChange.bind(this)} required />
			<p/>Interval(in seconds):<input name = "interval" type="number" min="1" max="99" value={this.state.interval}
			onChange={this.handleChange.bind(this)} required/>

			<p/>
			<button type ="submit" className = "btn btn-sm btn-primary marginDiv" >{counting}</button>
			</form>
			</div>
			<div className="col-md-6">
			<div className="innerbox">{this.state.counter}</div>
			</div>
			</div>
			</div>
			</div>
			
			
			</div>
			)
	}
}
