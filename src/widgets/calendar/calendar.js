import React, { Component } from 'react';
import './calendar.css';
import './react-big-calendar.css';
import '../../App.css';
import BigCalendar from 'react-big-calendar';
import CustomToolbar from './customToolbar';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';
const gapi = window.gapi;

const localizer = BigCalendar.momentLocalizer(moment);
let formats = {
	timeGutterFormat: 'ha'
};
let components = {
	toolbar: CustomToolbar
}

const getDefaults = function() {
	return {};
};

export default class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'signedIn':false,
			'events':[]
		};

		this.initClient = this.initClient.bind(this);
		this.checkSignedIn = this.checkSignedIn.bind(this);
		this.clickSignIn = this.clickSignIn.bind(this);
		this.getCalendarEvents = this.getCalendarEvents.bind(this);
	}

	componentDidMount()
	{		
		gapi.load('client:auth2', this.initClient);
	}

	initClient() {
		gapi.auth2.getAuthInstance().isSignedIn.listen(this.checkSignedIn);
		this.checkSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
	}

	checkSignedIn(isSignedIn, once = false)
	{
		if (isSignedIn) {
			this.setState({
				signedIn:true
			});
			this.getCalendarEvents();
		} else {
			this.setState({
				signedIn:false
			});
		}
		if (!once) {setTimeout(() => this.checkSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get()), 5*60*1000);}
	}

	clickSignIn()
	{
		gapi.auth2.getAuthInstance().signIn();
	}

	getCalendarEvents() {
		if (gapi.client.gmail !== undefined)
		{
			this.setState({
				events: [],
			});
			var request = gapi.client.calendar.calendarList.list();
			request.execute((response) => {
				//console.log(response.items);
				response.items.forEach(calendar => {
					if (calendar.selected === true) //If the calendar is visible on GCal
					{
						//console.log(calendar.summary + ' ' + calendar.selected);

						var today = new Date();
						var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
						lastWeek.setHours(0,0,0,0);
						lastWeek = lastWeek.toISOString();

						var request = gapi.client.calendar.events.list({
							'calendarId': calendar.id,
							'timeZone': '+332654−1120424'
						});
						request.execute((response) => {
							var build = [];
							//console.log(response.items);
							if (response.items !== undefined) // If there are events
							{
								response.items.forEach(event => {
									//console.log(event);
									if (event.start !== undefined) // If the event still exists (i.e wasn't canceled but not deleted)
									{
										if (event.start.dateTime !== undefined) // If there is a time associated with the event (i.e. not all day)
										{
											build.push({
												'title': event.summary,
												'color': calendar.backgroundColor,
												'start': new Date(event.start.dateTime),
												'end': new Date(event.end.dateTime)
											});
											if (event.recurrence !== undefined)
											{
												console.log(event.recurrence[0])
												var startDate = moment(event.start.dateTime).format('YYYYMMDD');
												const rule = RRule.fromString('DTSTART:'+startDate+';'+event.recurrence[0]+';COUNT=50');
												//console.log(rule.all());
												// rule.all().map(date => {
												// 	build.push({
												// 		'title': event.summary,
												// 		'color': calendar.backgroundColor,
												// 		'start': date,
												// 		'end': date
												// 	});
												// })
												// if (event.recurrence[0].match(/FREQ=([A-Z]+);/)[1] == 'WEEKLY')
												// {
												// 	var currStartDate = new Date(event.start.dateTime);
												// 	var currEndDate = new Date(event.end.dateTime);
												// 	console.log(event.recurrence);
												// 	console.log(moment(event.start.dateTime).weekday());
												// 	if (event.recurrence[0].match(/UNTIL=([0-9]+)/))
												// 	{
												// 		var until = new Date(event.recurrence[0].match(/UNTIL=([0-9]+)/)[1].slice(0,4),event.recurrence[0].match(/UNTIL=([0-9]+)/)[1].slice(4,6),event.recurrence[0].match(/UNTIL=([0-9]+)/)[1].slice(7,10));
												// 		console.log(until);
												// 	}
												// 	else
												// 	{
												// 		var until = new Date(today.getFullYear()+1, today.getMonth(), today.getDate());
												// 	}
												// 	if (event.recurrence[0].match(/BYDAY=([A-Z,]+)/))
												// 	{
												// 		console.log(event.recurrence[0].match(/BYDAY=([A-Z,]+)/)[1].split(','));
												// 	}
												// 	else
												// 	{
												// 		console.log('...');
												// 	}
												// 	while (currStartDate < until)
												// 	{
												// 		currStartDate.setDate(currStartDate.getDate() + 7);
												// 		console.log(currStartDate);
												// 		currEndDate.setDate(currEndDate.getDate() + 7); 
												// 		build.push({
												// 			'title': event.summary,
												// 			'color': calendar.backgroundColor,
												// 			'start': currStartDate,
												// 			'end': currEndDate
												// 		});
												// 	}
												// }
											}
										}
										else // If the event is all day
										{
											build.push({
												'title': event.summary,
												'color': calendar.backgroundColor,
												'allDay': true,
												'start': new Date(event.end.date),
												'end': new Date(event.end.date)
											});
										}
									}
								});
							}
							//console.log(build);
							
							this.setState({
								events: this.state.events.concat(build)
							});
							// console.log(this.state.events.length)
						});
					}
					
				});
				// this.setState({
				// 	unreadMessages:response.messagesUnread
				// });
			});
		}
		else
		{
			console.log('Still waiting for the Google API to load...');
			setTimeout(() => this.getCalendarEvents(), 1000);
		}
	}

	render() {
		return (
			
			<div style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
				{!this.state.signedIn && 
				<button className="loginBtn loginBtn--google" onClick={this.clickSignIn}>
					Login with Google
				</button>
				}
				{this.state.signedIn && 
					<div style={{width:'100%',height:'100%'}}>
						<BigCalendar
							localizer={localizer}
							events={this.state.events}
							defaultView='day'
							views={['day']}
							formats={formats}
							components={components}
							defaultDate={new Date()}
							eventPropGetter={event => ({
								style: {
									backgroundColor: event.color,
								},
							})}
							slotPropGetter={slot => ({
								style: {
									borderColor: '#282c34',
								},
							})}
						/>
						<img className="logout-button" src="https://cdn1.iconfinder.com/data/icons/small-black-v5/512/account_arrow_exit_log_logout_out_signout-512.png" alt="" onClick={() => gapi.auth2.getAuthInstance().signOut()}/>
						<img className="test-button" src="https://cdn1.iconfinder.com/data/icons/small-black-v5/512/account_arrow_exit_log_logout_out_signout-512.png" alt="" onClick={() => this.getCalendarEvents()}/>
					</div>
				}
			</div>
		);
	}
}

export { getDefaults };