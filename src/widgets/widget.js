import React, { Component } from 'react';
import Clock,  * as clock from './clock/clock.js';
import Weather,  * as weather from './weather/weather.js';

const getDefaults = function(type) {
	if (type == 'clock')
	{
		return clock.getDefaults();
	}
	if (type == 'weather')
	{
		return weather.getDefaults();
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
};


export { getDefaults, renderWidget };