import React, { Component } from 'react';
import './weather.css';
import '../../App.css';


const getDefaults = function() {
	return {'zip':'90001','apikey':'822fe3200a25f792fd1a5a34457d27a7'};
};

export default class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'data':{},
			error: false
		};

		this.checkWeather = this.checkWeather.bind(this);
	}

	componentWillMount(){
		this.checkWeather();
	}
	
	async checkWeather() {
		fetch('http://api.openweathermap.org/data/2.5/weather?zip='+ this.props.settings.zip +',us&units=imperial&appid='+ this.props.settings.apikey)
			.then((response) => response.json())
			.then((response) => {
				//alert(JSON.stringify(response))
				//this.fetchItems();
				//console.log(response);
				if (response.weather !== undefined)
				{
					switch (response.weather[0].icon)
					{
					case '01d':
					case '01n':
						response.weather[0].icon='clear';
						break;
					case '02d':
					case '02n':
						response.weather[0].icon='partlycloudy';
						break;
					case '03d':
					case '03n':
						response.weather[0].icon='mostlycloudy';
						break;
					case '04d':
					case '04n':
						response.weather[0].icon='cloudy';
						break;
					case '09d':
					case '09n':
					case '10d':
					case '10n':
						response.weather[0].icon='rain';
						break;
					case '11d':
					case '11n':
						response.weather[0].icon='tstorms';
						break;
					case '13d':
					case '13n':
						response.weather[0].icon='snow';
						break;
					case '50d':
					case '50n':
						response.weather[0].icon='fog';
						break;
					}
					//data = JSON.parse(data);
					this.setState({
						data: response
					});
				}
				else
				{
					this.setState({
						error: true
					});
				}
				setTimeout(() => this.checkWeather, 5*60*1000);
			});
	}

	render() {
		return (
			<div className='fontFive' style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
				{this.state.data.weather !== undefined &&
					
					<div className="weatherIcon">
						<div className={this.state.data.weather[0].icon}>
							<div className="inner"></div>
						</div>
					</div>
				}

				<p>
					{this.state.data.weather !== undefined && this.state.data.main.temp + '° F'}
					{this.state.error === true && 'API ERROR'}
				</p>
			</div>
		);
	}
}


export { getDefaults };