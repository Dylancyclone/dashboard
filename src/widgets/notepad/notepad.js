import React, { Component } from 'react';
import '../../App.css';


const getDefaults = function() {
	return {'text':'Notes'};
};

export default class Notepad extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{display:'flex',width:'100%',height:'100%'}}>
				<p style={{display:'flex',width:'100%',height:'100%',whiteSpace:'pre-wrap'}}>
					{this.props.settings.text}
				</p>
			</div>
		);
	}
}


export { getDefaults };