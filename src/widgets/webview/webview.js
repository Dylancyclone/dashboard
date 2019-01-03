import React, { Component } from 'react';
import Iframe from 'react-iframe';
import '../../App.css';


const getDefaults = function() {
	return {'url':'https://bing.com/'};
};

export default class WebView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			
			<Iframe url={this.props.settings.url}
				width="100%"
				height="100%"
				display="initial"
				position="relative"
			/>
		);
	}
}


export { getDefaults };