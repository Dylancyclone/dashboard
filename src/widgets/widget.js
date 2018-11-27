import React, { Component } from 'react';
import Clock,  * as clock from './clock.js';

const getDefaults = function(type) {
	if (type == 'clock')
	{
		return clock.getDefaults();
	}
};

const renderWidget = function(type, settings) {
	if (type == 'clock')
	{
		return (<Clock settings={settings} />);
	}
};


export { getDefaults, renderWidget };