import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';

let navigate = {
	PREVIOUS: 'PREV',
	NEXT: 'NEXT',
	TODAY: 'TODAY',
	DATE: 'DATE',
};

class CustomToolbar extends React.Component {
	static propTypes = {
		view: PropTypes.string.isRequired,
		views: PropTypes.arrayOf(PropTypes.string).isRequired,
		label: PropTypes.node.isRequired,
		localizer: PropTypes.object,
		onNavigate: PropTypes.func.isRequired,
		onView: PropTypes.func.isRequired,
	}

	render() {
		let { localizer: { messages }, label } = this.props;

		return (
			<div className="rbc-toolbar">
				<span>
					<button
						type="button"
						onClick={this.navigate.bind(null, navigate.TODAY)}
					>
						{messages.today}
					</button>
					<div
						onClick={this.navigate.bind(null, navigate.PREVIOUS)}
					>
						<svg viewBox={'0 0 24 24'} style={{display: 'inline-block', color: '#FAFAFA', fill: '#FAFAFA', height: '24px', width: '24px', userSelect: 'none', linHeight: '24px'}}>
							<path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
						</svg>
					</div>
					<div
						onClick={this.navigate.bind(null, navigate.NEXT)}
					>
						<svg viewBox={'0 0 24 24'} style={{display: 'inline-block', color: '#FAFAFA', fill: '#FAFAFA', height: '24px', width: '24px', userSelect: 'none', linHeight: '24px'}}>
							<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
						</svg>
					</div>
				</span>

				<span className="rbc-toolbar-label">{label}</span>

				<span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
			</div>
		);
	}

	navigate = action => {
		this.props.onNavigate(action);
	}

	view = view => {
		this.props.onView(view);
	}

	viewNamesGroup(messages) {
		let viewNames = this.props.views;
		const view = this.props.view;

		if (viewNames.length > 1) {
			return viewNames.map(name => (
				<button
					type="button"
					key={name}
					className={cn({ 'rbc-active': view === name })}
					onClick={this.view.bind(null, name)}
				>
					{messages[name]}
				</button>
			));
		}
	}
}

export default CustomToolbar;