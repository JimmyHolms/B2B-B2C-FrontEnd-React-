import React from "react";
import {Link, withRouter} from "react-router";
import GoogleSearch from "google-search";
import DropdownMenu from "./elements/DropdownMenu.jsx";
import LocalStorageService from "../services/LocalStorageService";
import CustomerStore from "../stores/CustomerStore";
import * as CustomerActions from "../actions/CustomerActions";
import * as properties from "../../properties";

@withRouter
export default class HeaderComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			currentCustomer: null,
			isLoggedIn: false,
			searchTerm: null,
			mobileMenu: "none"
		};
		this.closeMenu = this.closeMenu.bind(this);
	}

	componentWillMount() {
		CustomerStore.bindUpdateHandler(this.renderHeader.bind(this));
		window.addEventListener("click", this.closeMenu);
	}

	componentWillUnmount() {
		CustomerStore.unbindUpdateHandler(this.renderHeader.bind(this));
		window.removeEventListener("click", this.closeMenu);
	}

	componentDidMount() {
		CustomerActions.getCurrentCustomer();
	}

	updateSearchTerm(event) {
		const searchTerm = event.target.value;
		this.setState({
			searchTerm: searchTerm
		});
	}

	renderHeader(currentCustomer) {
		this.setState({
			isLoggedIn: currentCustomer != null,
			currentCustomer
		});
	}

	logout(event) {
		event.preventDefault();
		CustomerActions.logoutCurrentCustomer();
	}

	search(event) {
		event.preventDefault();
		const {searchTerm} = this.state;
		if (!!searchTerm && searchTerm.trim() !== '') {
			var googleSearch = new GoogleSearch({
				key: properties.google_api_key,
				cx: properties.search_engine_id
			});
			googleSearch.build({
				start: 1,
				q: searchTerm,
			}, function (error, response) {
				LocalStorageService.set("search_result", response);
				document.location = "index.html#/client/search";
			});
		}
	}

	clickedOutsideOf(event, ids = []) {
		const clicked = ids.every(id=> {
			return event.target.id !== id
				&& event.target.parentNode.id !== id
				&& event.target.parentNode.parentNode.id !== id;
		});
		return clicked;
	}

	toggleMenu() {
		const {mobileMenu} = this.state;
		const alert = document.getElementById("alert");
		this.setState({
			mobileMenu: (mobileMenu === "none" ? "block" : "none")
		});
	}

	closeMenu(event) {
		const {mobileMenu} = this.state;
		if (mobileMenu === "block" && this.clickedOutsideOf(event, [
				"mobile-menu",
				"settings-menu",
				"header-settings",
				"header-help",
				"header-search"
			])) {
			this.setState({
				mobileMenu: (mobileMenu === "none" ? "block" : "none")
			});
		}
	}

	render() {
		const {currentCustomer, isLoggedIn} = this.state;
		return (
			<nav id="header-navbar" className="navbar navbar-default navbar-fixed-top" role="navigation">
				<div className="navbar-wrapper">
					<div className="navbar-header">
						<div>
							<Link to={properties.dashboard_url} className="navbar-brand">
								<img src="images/logo.png" className="logo img-responsive"/>
							</Link>
							<button id="mobile-menu" type="button" className="navbar-toggle" onClick={this.toggleMenu.bind(this)}>
								<span className="sr-only">Menu</span>
								<span className="icon-bar"/>
								<span className="icon-bar"/>
								<span className="icon-bar"/>
							</button>
						</div>
					</div>

					<div id="right-menu" className="collapse navbar-collapse" style={{display: this.state.mobileMenu}}>
						<ul className="nav navbar-nav navbar-right">
							{isLoggedIn ?
								<li>
									<form className="navbar-form" role="search" onSubmit={this.search.bind(this)}>
										<div className="form-group">
											<input id="header-search" type="text" className="form-control" placeholder="Search" onChange={this.updateSearchTerm.bind(this)}/>
										</div>
										<button type="submit" className="sr-only">Submit</button>
									</form>
								</li> : null
							}
							{isLoggedIn ?
								<li>
									<div className="navbar-text navbar-text-sm">
										<h4 className="row">{currentCustomer.name.firstName}{' '}{currentCustomer.name.lastName}</h4>
									</div>
								</li> : null
							}
							{isLoggedIn ?
								<DropdownMenu id="header-settings" icon="fa-cog" label="Options">
									<ul className="dropdown-menu">
										<li><Link to="#">Change language</Link></li>
										<li><Link to={properties.my_account_url}>My account</Link></li>
										<li><Link to="#" onClick={this.logout.bind(this)}>Logout</Link></li>
									</ul>
								</DropdownMenu> : null
							}
							{!isLoggedIn ?
								<li>
									<Link to={properties.signin_url}>
										<i className="fa fa-user fa-2x hidden-xs"/>
										<i className="fa fa-user visible-xs-inline"/>
										<span className="visible-xs-inline"> Login</span>
									</Link>
								</li> : null
							}
							<li id="header-help" icon="fa-question" label="Help">
								<a href={properties.wiki_url} target="_blank">
									<i className="fa fa-question fa-2x hidden-xs"/>
									<i className="fa fa-question visible-xs-inline"/>
									<span className="visible-xs-inline"> Help</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				{isLoggedIn ?
					<div id="second-level-menu" className="collapse navbar-collapse navbar-second-level" style={{display: this.state.mobileMenu}}>
						<ul className="nav navbar-nav navbar-left">
							<li>
								<Link id="home" to={properties.dashboard_url}>
									<i className="fa fa-home fa-3x hidden-xs"/>
									<span className="visible-xs-inline">Home</span>
								</Link>
							</li>
							<li><Link to={properties.available_offers_url}>Shop</Link></li>
							<li><a href={properties.community_url} target="_blank">Community</a></li>
							<li><Link to={properties.my_offers_url}>My Contracts</Link></li>
							<li><Link to={properties.my_account_url}>My Account</Link></li>
							<li><Link to={properties.follow_order_url}>Follow Order</Link></li>
						</ul>
					</div>
					:
					<div id="second-level-menu" className="collapse navbar-collapse navbar-second-level" style={{display: this.state.mobileMenu}}>
						<ul className="nav navbar-nav navbar-left">
							<li>
								<Link id="home" to={properties.index_url}>
									<i className="fa fa-home fa-3x hidden-xs"/>
									<span className="visible-xs-inline">Home</span>
								</Link>
							</li>
							<li><Link to={properties.available_offers_url + "/ananymous"}>Shop</Link></li>
							<li><a href={properties.community_url} target="_blank">Community</a></li>
							<li><Link to={properties.about_url}>About Us</Link></li>
						</ul>
					</div>
				}
			</nav>
		);
	}
}
