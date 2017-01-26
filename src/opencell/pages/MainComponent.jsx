import React, {Component} from 'react';
import {withRouter} from 'react-router';

import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import CustomerStore from '../stores/CustomerStore';
import { getCurrentCustomer } from '../actions/CustomerActions';
import LocalStorageService from '../services/LocalStorageService'

import * as properties from  '../../properties';

@withRouter
class MainComponent extends Component{

	constructor() {
		super();
		this.isClientPage = false;
		// The MainComponent is the only component that talks directly to
		// the LocalStorageService.  It allows it to load the currentCustomer
		// directly so that it can redirect when necessary.
		// Other components should bind to the CustomerStore's update handler
		// event instead.
		this.state = {
			isClientPage: false,
			currentCustomer: LocalStorageService.get("currentCustomer")
		};
	}

	componentWillMount() {
		CustomerStore.bindUpdateHandler(this.updateCurrentCustomer.bind(this));
	}

	componentWillUnmount() {
		CustomerStore.unbindUpdateHandler(this.updateCurrentCustomer.bind(this));
	}

	componentDidMount() {
		getCurrentCustomer();
	}

	componentWillUpdate(nextProps, nextState) {
		this.redirectIfNeeded(nextProps, nextState);
	}

	updateCurrentCustomer(currentCustomer) {
		this.setState({
			currentCustomer
		});
	}

	redirectIfNeeded(nextProps, nextState) {
		// figure out the current url
		let url = null;
		if(nextProps !== null && typeof nextProps !== 'undefined'){
			url = nextProps.location.pathname;
		} else {
			url = this.props.location.pathname;
		}

		// check if the current url is a /client page
		this.isClientPage = url.indexOf("/client") >= 0;
		if(this.isClientPage) {
			document.getElementById('selfcare').style.paddingTop = "15px";
		} else {
			document.getElementById('selfcare').style.paddingTop = "0px";
		}

		// get currentCustomer from state
		const { currentCustomer } = nextState;
		// if customer is null and a /client page is being acessed,
		// redirect the customer to the login page
		if(currentCustomer == null && this.isClientPage) {
			if(url!=properties.available_offers_url+"/ananymous")
			{
				this.props.router.push(properties.signin_url);
			}
		}
	}

	displayFooter() {
		// if(!this.isClientPage) {
			return (
				<footer>
					<FooterComponent location = {this.props.location.pathname} />
				</footer>
			);
		// }
	}

	render() {
		return (
			<div>
				<header className="header" >
					<HeaderComponent location = {this.props.location.pathname} />
				</header>
				<div className="content" id="content">
					{this.props.children}
				</div>
				{this.displayFooter()}
			</div>
		);
	}
}

module.exports = MainComponent;
