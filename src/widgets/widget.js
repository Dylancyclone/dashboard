import React, { Component } from 'react';
import Clock, * as clock from './clock/clock.js';
import Weather, * as weather from './weather/weather.js';
import WebView, * as webview from './webview/webview.js';
import Gmail, * as gmail from './gmail/gmail.js';
import Calendar, * as calendar from './calendar/calendar.js';

const getDefaults = function(type) {
	if (type == 'clock')
	{
		return clock.getDefaults();
	}
	if (type == 'weather')
	{
		return weather.getDefaults();
	}
	if (type == 'webview')
	{
		return webview.getDefaults();
	}
	if (type == 'gmail')
	{
		return gmail.getDefaults();
	}
	if (type == 'calendar')
	{
		return calendar.getDefaults();
	}
};

const renderWidget = function(type, settings) {
	if (type == 'clock')
	{
		return (<Clock settings={settings} />);
	}
	if (type == 'weather')
	{
		return (<Weather settings={settings} />);
	}
	if (type == 'webview')
	{
		return (<WebView settings={settings} />);
	}
	if (type == 'gmail')
	{
		return (<Gmail settings={settings} />);
	}
	if (type == 'calendar')
	{
		return (<Calendar settings={settings} />);
	}
};


export { getDefaults, renderWidget };