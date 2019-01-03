import React, { Component } from 'react';
import Clock, * as clock from './clock/clock.js';
import Weather, * as weather from './weather/weather.js';
import WebView, * as webview from './webview/webview.js';
import Gmail, * as gmail from './gmail/gmail.js';
import Calendar, * as calendar from './calendar/calendar.js';
import Notepad, * as notepad from './notepad/notepad.js';
import Countdown, * as countdown from './countdown/countdown.js';

const getDefaults = function(type) {
	switch (type)
	{
	case 'clock':
		return clock.getDefaults();
	case 'weather':
		return weather.getDefaults();
	case 'webview':
		return webview.getDefaults();
	case 'gmail':
		return gmail.getDefaults();
	case 'calendar':
		return calendar.getDefaults();
	case 'notepad':
		return notepad.getDefaults();
	case 'countdown':
		return countdown.getDefaults();
	}
};

const renderWidget = function(item) {
	switch (item.type)
	{
	case 'clock':
		return (<Clock settings={item.settings} />);
	case 'weather':
		return (<Weather settings={item.settings} />);
	case 'webview':
		return (<WebView settings={item.settings} />);
	case 'gmail':
		return (<Gmail settings={item.settings} />);
	case 'calendar':
		return (<Calendar settings={item.settings} />);
	case 'notepad':
		return (<Notepad settings={item.settings} />);
	case 'countdown':
		return (<Countdown settings={item.settings} />);
	}
};


export { getDefaults, renderWidget };