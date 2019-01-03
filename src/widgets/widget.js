import React, { Component } from 'react';
import Clock, * as clock from './clock/clock.js';
import Weather, * as weather from './weather/weather.js';
import WebView, * as webview from './webview/webview.js';
import Gmail, * as gmail from './gmail/gmail.js';
import Calendar, * as calendar from './calendar/calendar.js';
import Notepad, * as notepad from './notepad/notepad.js';
import Countdown, * as countdown from './countdown/countdown.js';

const getDefaultSettings = function(type) {
	switch (type)
	{
	case 'clock':
		return clock.getDefaultSettings();
	case 'weather':
		return weather.getDefaultSettings();
	case 'webview':
		return webview.getDefaultSettings();
	case 'gmail':
		return gmail.getDefaultSettings();
	case 'calendar':
		return calendar.getDefaultSettings();
	case 'notepad':
		return notepad.getDefaultSettings();
	case 'countdown':
		return countdown.getDefaultSettings();
	}
};
const getDefaultData = function(type) {
	switch (type)
	{
	case 'clock':
		return clock.getDefaultData();
	case 'weather':
		return weather.getDefaultData();
	case 'webview':
		return webview.getDefaultData();
	case 'gmail':
		return gmail.getDefaultData();
	case 'calendar':
		return calendar.getDefaultData();
	case 'notepad':
		return notepad.getDefaultData();
	case 'countdown':
		return countdown.getDefaultData();
	}
};

const renderWidget = function(item, callback) {
	if (item.type == 'clock')
	{
		return (<Clock settings={item.settings} />);
	}
	if (item.type == 'weather')
	{
		return (<Weather settings={item.settings} />);
	}
	if (item.type == 'webview')
	{
		return (<WebView settings={item.settings} />);
	}
	if (item.type == 'gmail')
	{
		return (<Gmail settings={item.settings} />);
	}
	if (item.type == 'calendar')
	{
		return (<Calendar settings={item.settings} />);
	}
	if (item.type == 'notepad')
	{
		return (<Notepad settings={item.settings} data={item.data} callback={callback}/>);
	}
	if (item.type == 'countdown')
	{
		return (<Countdown settings={item.settings} />);
	}
};


export { getDefaultSettings, getDefaultData, renderWidget };