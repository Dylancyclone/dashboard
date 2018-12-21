import React, { Component } from 'react';
import '../../App.css';


const getDefaults = function() {
	var date = new Date();
	date.setHours(date.getHours()+1);
	return {'title':'Countdown','targetTime':date.toGMTString()};
};

export default class Countdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'time':'0'
		};

		this.startCountdown = this.startCountdown.bind(this);
		this.checkTime = this.checkTime.bind(this);
	}

	componentWillMount(){
		this.startCountdown();
	}
	
	startCountdown() {
		var targetTime = new Date(this.props.settings.targetTime).getTime();
		var now = new Date().getTime();

		var distance = targetTime - now;

		var d = Math.floor(distance / (1000 * 60 * 60 * 24));
		var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var s = Math.floor((distance % (1000 * 60)) / 1000);

		if (d !== 0)
		{
			this.setState({
				time: d + ':' + this.checkTime(h) + ':' + this.checkTime(m) + ':' + this.checkTime(s)
			});
		}
		else
		{
			this.setState({
				time: h + ':' + this.checkTime(m) + ':' + this.checkTime(s)
			});
		}
		setTimeout(this.startCountdown, 500);
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