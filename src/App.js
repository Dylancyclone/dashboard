import React, { Component } from 'react';

import GridController from './gridController.js';
import './react-grid-layout.css';
import './App.css';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			layout: []
		};
		this.onLayoutChange = this.onLayoutChange.bind(this);
	}

	
	onLayoutChange(layout) {
		//alert(JSON.stringify(layout))
		//console.log(JSON.parse(JSON.stringify(layout)));
		localStorage.setItem('layout', JSON.stringify(layout));
		this.setState({ layout: layout });
	}

	stringifyLayout() {
		return this.state.layout.map(function(l) {
			return (
				<div className="layoutItem" key={l.i}>
					<b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
				</div>
			);
		});
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};
	
	render() {
		return (
			<div className="App">
				<div className="content">
					<p className="fontFive" style={this.styles.dev}>Dashboard</p>
					
					<div className="layoutJSON">
						Displayed as <code>[x, y, w, h]</code>:
						<div className="columns">{this.stringifyLayout()}</div>
					</div>
					
					<div className="tableContainer">
						{
							/*this.renderRow()*/
						}
						<GridController onLayoutChange={this.onLayoutChange}/>
					</div>
				</div>
			</div>
		);
	}

	styles = {
		foo: {
			color: 'red',
			backgroundColor: 'white'
		},
		dev: {
			padding:0,
			margin:0,
			color: 'white'
		},
	}
}



export default App;
