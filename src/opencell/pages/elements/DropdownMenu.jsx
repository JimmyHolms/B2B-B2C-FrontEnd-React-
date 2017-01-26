import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class DropdownMenu extends React.Component {

	constructor() {
		super();
		this.state = {
			showDropdown: false
		};
		this.closeDropdown = this.closeDropdown.bind(this);
	}

	componentDidMount() {
		this.unMounted = false;
		window.addEventListener("click", this.closeDropdown);
	}

	componentWillUnmount() {
		window.removeEventListener("click", this.closeDropdown);
		this.unMounted = true;
	}


	closeDropdown(event) {
		const {showDropdown} = this.state;
		const {id} = this.props;
		if (showDropdown
			&& event.target.id !== id
			&& event.target.parentNode.id !== id
			&& event.target.parentNode.parentNode.id !== id) {
			this.setState({
				showDropdown: false
			});
		}
	}

	toggleDropdown(e) {
		e.preventDefault();
		this.setState({
			showDropdown: !this.state.showDropdown
		});
	}

	renderMenuLink() {
		const {id, icon, label} = this.props;
		const {showDropdown} = this.state;
		const hasIcon = !!icon;
		const fullIcon = "fa " + icon + " fa-2x hidden-xs";
		const smallIcon = "fa " + icon + " visible-xs-inline";
		if (hasIcon) {
			return (
				<a id={id} className="dropdown-toggle navbar-control-icon" onClick={this.toggleDropdown.bind(this)}>
					<i className={fullIcon}/>
					<i className={smallIcon}/>
					<span className="visible-xs-inline"> {label}</span>
				</a>
			);
		} else {
			return (
				<a id={id} className="dropdown-toggle navbar-control-icon" onClick={this.toggleDropdown.bind(this)}>
					<span>{label} </span>
					{showDropdown ? <i className="fa fa-angle-up"/> : <i classNameName="fa fa-angle-down"/>}
				</a>
			);
		}
	}

	renderDropdown() {
		if (this.state.showDropdown) {
			return this.props.children;
		}
		return null;
	}

	render() {
		return (
			<li className="toggle-dropdown">
				{this.renderMenuLink()}
				<ReactCSSTransitionGroup transitionName="fade"
										 transitionAppear={true}
										 transitionLeave={true}
										 transitionEnterTimeout={600}
										 transitionAppearTimeout={600}
										 transitionLeaveTimeout={300}>
					{this.renderDropdown()}
				</ReactCSSTransitionGroup>
			</li>
		);
	}
}