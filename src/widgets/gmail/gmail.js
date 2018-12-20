import React, { Component } from 'react';
import './gmail.css';
import '../../App.css';
const gapi = window.gapi;

const getDefaults = function() {
	return {};
};

export default class Gmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'signedIn':false,
			'unreadMessages':'0'
		};

		this.initClient = this.initClient.bind(this);
		this.checkSignedIn = this.checkSignedIn.bind(this);
		this.clickSignIn = this.clickSignIn.bind(this);
		this.getUnreadMessages = this.getUnreadMessages.bind(this);
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
			this.getUnreadMessages();
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

	getUnreadMessages() {
		var request = gapi.client.gmail.users.labels.get({
			'userId': 'me',
			'id': 'INBOX'
		});
		request.execute((response) => {
			//console.log(response.messagesUnread);
			this.setState({
				unreadMessages:response.messagesUnread
			});
		});
	}

	render() {
		return (
			
			<div className='fontFive' style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
				{!this.state.signedIn && 
				<button className="loginBtn loginBtn--google" onClick={this.clickSignIn}>
					Login with Google
				</button>
				}
				{this.state.signedIn && 
					<div className="item">
						<img style={{width:'100px',height:'100px'}} src="https://img.icons8.com/color/1600/gmail.png"  alt="" />
						<span className="notify-badge" onClick={() => window.open('https://mail.google.com', '_blank')}> {this.state.unreadMessages} </span>
						<img className="logout-badge" src="https://cdn1.iconfinder.com/data/icons/small-black-v5/512/account_arrow_exit_log_logout_out_signout-512.png" alt="" onClick={() => gapi.auth2.getAuthInstance().signOut()}/>
					</div>
				}
			</div>
		);
	}
}


export { getDefaults };