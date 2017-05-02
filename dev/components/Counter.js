import React from 'react';


export default class Counter extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			counterValue: 0,
			interval: 1,
			countTo: 10,
			active: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillUnmount() {

		this.stopCounting()
	}

	handleChange(event) {

		const name = event.target.name;

		const value = parseInt(event.target.value);
		if (Number.isInteger(value)) {
			this.setState({
				[name]: value
			});
		}
	}

	handleSubmit(event) {

		event.preventDefault();

		this.stopCounting();

		if (this.state.active) {
			this.setState({
				counterValue: 0
			});
			return
		}

		this.setState({
			counterValue: 0,
			active: true
		}, () => {
			let countTo = this.state.countTo;
			this.intervalRef = setInterval(() => this.incrementCount(countTo), this.state.interval * 1000);
		});
	}

	stopCounting() {

		clearInterval(this.intervalRef);
		this.intervalRef = null;

		this.setState({
			active: false
		});
	}

	incrementCount(countTo) {

		if (this.state.counterValue >= countTo) {
			console.debug("counterValue is >= countTo");

			this.stopCounting();

			return
		}

		console.debug(this.state);

		this.setState((prevState, props) => {
			return {
				counterValue: prevState.counterValue + 1
			}
		});

		console.debug("Count incremented...");
	}

	render() {

		return (

			<div>
			<div className="counterBox">{this.state.counterValue}</div>
			<div className="inputs">
			<form onSubmit={this.handleSubmit}>
			<Inputs active={this.state.active} interval={this.state.interval} countTo={this.state.countTo} handleChange={this.handleChange}/>
			</form>
			</div>
			</div>

		);
	}
}

class Inputs extends React.Component {

	render() {

		const active = (this.props.active) ? "Reset counter..." : "Go!"
		return (
			<div>
			<label>
			Count to
			<input type="number" min="1" max="1000" maxLength="4" name="countTo" defaultValue={this.props.countTo} onChange={this.props.handleChange} />
			</label>
			<label>
			incrementing every
			<input type="number" min="1" max="99" maxLength="2" name="interval" defaultValue={this.props.interval} onChange={this.props.handleChange} />
			</label> second(s).
			<div>
			<input type="submit" value={active} />
			</div>
			</div>
		);
	}
}
