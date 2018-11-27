import React, { Component } from 'react';
import '../App.css';


const getDefaults = function() {
	return {'title':'Clock'};
};

export default class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'time':'0'
		};

		this.startTime = this.startTime.bind(this);
		this.checkTime = this.checkTime.bind(this);
	}

	componentWillMount(){
		this.startTime();
	}
	
	startTime() {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		m = this.checkTime(m);
		s = this.checkTime(s);
		this.setState({
			time: h + ':' + m + ':' + s
		});
		setTimeout(this.startTime, 500);
	}
	checkTime(i) {
		if (i < 10) {i = '0' + i;}  // add zero in front of numbers < 10
		return i;
	}

	render() {
		return (
			<div className='fontFive' style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
				<p>
					{this.props.settings.title}
					{this.props.settings.title !== '' && '\n'}
					{this.state.time}
				</p>
			</div>
		);
	}
}


export { getDefaults };