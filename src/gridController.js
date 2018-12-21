import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import { getDefaults, renderWidget } from './widgets/widget';

import './react-grid-layout.css';
import { Typography } from '@material-ui/core';

import {config} from './config';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = localStorage.getItem('layout') || '[]';
const originalData = localStorage.getItem('data') || '[]';

const gapi = window.gapi;


function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class GridController extends React.PureComponent {
	static defaultProps = {
		className: 'layout',
		cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
		rowHeight: 100,
		verticalCompact: false,
	};

	constructor(props) {
		super(props);

		this.state = {
			items: JSON.parse(originalLayouts),
			data: JSON.parse(originalData),
			modalVisible: false,
			inspectItem:{'type':'', settings:{}}
		};

		this.onAddItem = this.onAddItem.bind(this);
		this.onBreakpointChange = this.onBreakpointChange.bind(this);
		this.clickAdd = this.clickAdd.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	openModal = () => {
		this.setState({modalVisible: true});
	}
	closeModal = () => {
		this.setState({modalVisible: false});
	}
	
	handleSettingsValueChange = (item) => (event) => {
		this.setState({
			inspectItem: {
				...this.state.inspectItem,
				settings: {
					...this.state.inspectItem.settings,
					[item]: event.target.value
				}
			}
		});
	}
	handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			this.saveSettings();
		}
	}
	

	componentWillMount()
	{		
		gapi.load('client:auth2', this.initClient);
		

	}
	initClient() {
		gapi.client.init({
			apiKey: config.googleApiKey,
			clientId: '1082567242324-06e7cf3da16l32vf9qe9dfk7e7nlen9m.apps.googleusercontent.com',
			discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest','https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
			scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly'
		});
		//Init Google API client
	}

	createElement(el) {
		const removeStyle = {
			position: 'absolute',
			right: '2px',
			top: 0,
			cursor: 'pointer'
		};
		const settingsStyle = {
			position: 'absolute',
			left: '2px',
			bottom: 0,
			cursor: 'pointer'
		};
		return (
			<div key={el.i} data-grid={el} style={{color:'white'}}>
				<span
					className="remove"
					style={settingsStyle}
					onClick={this.clickSettings.bind(this, el.i)}
				>
					⚙
				</span>

				{/*<span className="text">{el.i}</span>*/}
				<div style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
					<div style={{display:'flex',width:'90%',height:'90%'}}>
						{renderWidget(this.state.data.find(obj => obj.i == el.i).type, this.state.data.find(obj => obj.i == el.i).settings)}
					</div>
				</div>
				<span
					className="remove"
					style={removeStyle}
					onClick={this.onRemoveItem.bind(this, el.i)}
				>
					x
				</span>
			</div>
		);
	}

	onAddItem() {
		this.setState({
			// Add a new item. It must have a unique key!
			items: this.state.items.concat({
				i: uuidv4(), //Generate UUIDv4
				x: (this.state.items.length * 2) % (this.state.cols || 12),
				y: Infinity, // puts it at the bottom
				w: 2,
				h: 2,
			})
		});
	}

	// We're using the cols coming back from this to calculate where to add new items.
	onBreakpointChange(breakpoint, cols) {
		this.setState({
			breakpoint: breakpoint,
			cols: cols
		});
	}

	onLayoutChange(layout) {
		this.props.onLayoutChange(layout);
		localStorage.setItem('layout', JSON.stringify(layout));
		this.setState({ layout: layout });
	}
	

	async onRemoveItem(i) {
		console.log('removing', i);
		await this.setState({
			items: _.reject(this.state.items, { i: i }),
			data: _.reject(this.state.data, { i: i })
	
		});
		localStorage.setItem('data', JSON.stringify(this.state.data));
	}

	clickSettings(i) {
		var object = this.state.data.find(obj => obj.i == i);
		//alert(JSON.stringify(object));
		this.setState({
			inspectItem: { ...object, 'id':object.i},
		});
		this.openModal();
	}
	
	async clickAdd(type) {
		var uudid = uuidv4(); //Generate UUIDv4
		var defaultValues = getDefaults(type);
		//alert(defaultValues)
		await this.setState({
			// Add a new item. It must have a unique key!
			items: this.state.items.concat({
				i: uudid,
				x: (this.state.items.length * 2) % (this.state.cols || 12),
				y: Infinity, // puts it at the bottom
				w: 2,
				h: 2
			}),
			data: this.state.data.concat({
				i: uudid,
				type:type,
				settings:defaultValues
			})
		});
		//alert(this.state.data);
		localStorage.setItem('data', JSON.stringify(this.state.data));
	}

	async saveSettings()
	{
		var settings = this.state.inspectItem;
		delete settings.id;
		var newSettings = _.reject(this.state.data, { i: settings.i });
		newSettings.push(settings);
		await this.setState({
			data: newSettings,
		});
		localStorage.setItem('data', JSON.stringify(this.state.data));
		this.closeModal();
	}

	render() {
		return (
			<div>
				<div style={{padding:20,display:'flex',flexDirection:'row'}}>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('blank')}>+</Avatar>
						<p>Blank</p>
					</div>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('clock')}>+</Avatar>
						<p>Clock</p>
					</div>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('weather')}>+</Avatar>
						<p>Weather</p>
					</div>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('webview')}>+</Avatar>
						<p>WebView</p>
					</div>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('gmail')}>+</Avatar>
						<p>Gmail</p>
					</div>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('calendar')}>+</Avatar>
						<p>Calendar</p>
					</div>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('notepad')}>+</Avatar>
						<p>Notepad</p>
					</div>
					<div style={{padding:10,display:'flex',flexDirection:'column',textAlign:'center', color: '#fafafa'}}>
						<Avatar style={{backgroundColor:'#FF5722',width:60,height:60}} onClick={() => this.clickAdd('countdown')}>+</Avatar>
						<p>Countdown</p>
					</div>
				</div>
				<ResponsiveReactGridLayout
					onLayoutChange={this.onLayoutChange}
					onBreakpointChange={this.onBreakpointChange}
					{...this.props}
				>
					{_.map(this.state.items, el => this.createElement(el))}
				</ResponsiveReactGridLayout>

				<Dialog
					open={this.state.modalVisible}
					TransitionComponent={Transition}
					onClose={this.closeModal}
				>
			
					<DialogTitle style={{minWidth:'300px'}}>
						Settings: {this.state.inspectItem.type || ''}
					</DialogTitle>
					<DialogContent style={{display:'flex',flexDirection:'column'}}>
						{
							this.state.data.find(obj => obj.i == this.state.inspectItem.id) !== undefined &&
							Object.keys(this.state.inspectItem.settings).map((item,id) =>
								<TextField
									key={item}
									type="text"
									label={item}
									value={this.state.inspectItem.settings[item]}
									onChange={this.handleSettingsValueChange(item)}
									onKeyPress={this.handleKeyPress}
									style={{paddingBottom:30}}
									fullWidth
									multiline
								/>
							)
						}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.closeModal} color="primary">
							Cancel
						</Button>
						<Button onClick={this.saveSettings} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}