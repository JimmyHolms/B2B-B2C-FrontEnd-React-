import React from 'react';
import {Modal} from 'react-bootstrap';
import {withRouter} from 'react-router';

import OfferCards from '../elements/OfferCards.jsx';
import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';
import SubscribeToOffer from '../elements/SubscribeToOffer.jsx';

import OfferStore from '../../stores/OfferStore';
import ServiceDetailsStore from '../../stores/ServiceDetailsStore';
import SubscriptionStore from '../../stores/SubscriptionStore';
import * as SubscriptionActions from '../../actions/SubscriptionActions';
import * as ServiceDetailsActions from '../../actions/ServiceDetailsActions';
import * as properties from  '../../../properties';

import {fetchOffers,setOfflineOffer} from '../../actions/OfferActions';
@withRouter
class AvailableOffers extends React.Component {

	constructor() {
		super();
		this.state = {
			subscriptions: [],
			subscription: null,
			offer: {},
			services: [],
			offers: [],
			customer: {},
			error: null,
			alert: null,
			isLoading: false,
			showSubscriptionForm: false,
			showSubscriptionConfirmation: false
		};
	}

	componentWillMount() {
		SubscriptionStore.bindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.bindUpdateHandler(this.renderSubscriptions.bind(this));
		SubscriptionStore.bindErrorHandler(this.renderError.bind(this));

		OfferStore.bindLoadHandler(this.renderLoader.bind(this));
		OfferStore.bindUpdateHandler(this.renderOffers.bind(this));
		OfferStore.bindErrorHandler(this.renderError.bind(this));

		ServiceDetailsStore.bindUpdateHandler(this.updateServiceDetails.bind(this));
	}

	componentWillUnmount() {
		SubscriptionStore.unbindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.unbindUpdateHandler(this.renderSubscriptions.bind(this));
		SubscriptionStore.unbindErrorHandler(this.renderError.bind(this));

		OfferStore.unbindLoadHandler(this.renderLoader.bind(this));
		OfferStore.unbindUpdateHandler(this.renderOffers.bind(this));
		OfferStore.unbindErrorHandler(this.renderError.bind(this));

		ServiceDetailsStore.unbindUpdateHandler(this.updateServiceDetails.bind(this));
	}

	componentDidMount() {
		const {subscriptionCode} = this.props.routeParams;
		if (subscriptionCode && subscriptionCode.trim() !== '') {
			if(subscriptionCode!="ananymous")
			{
				SubscriptionActions.fetchSubscriptionByCode(subscriptionCode);
			}
		} else {
				SubscriptionActions.fetchSubscriptions();
		}
		fetchOffers();
	}

	subscribeToOffer() {
		const {subscription, offer, services, subscriptions} = this.state;
		const {subscriptionCode} = this.props.routeParams;
		const exists = offer && subscriptions.some(sub => sub.offerTemplate.code === offer.code);
		if(subscriptionCode == "ananymous")
		{
			setOfflineOffer(offer,services);
			this.props.router.push(properties.signin_url);
		}else
		{
			if (exists) {
				this.showErrorAlert("You are already subscribed to this offer.");
			} else if (subscription) {
				SubscriptionActions.createSubscription(offer, services,subscription);
			} else {
				SubscriptionActions.createSubscription(offer, services,subscription);
			}
		}		
	}

	renderSubscriptionForm(subscription, offer) {
		const {subscriptions} = this.state;
		const exists = subscription && subscriptions.some(sub => sub.offerTemplate.code === offer.code);
		if (exists) {
			this.showErrorAlert("You are already subscribed to this offer.");
		} else {
			this.setState({
				subscription,
				offer,
				services: [],
				error: null,
				isLoading: false,
				showSubscriptionForm: true,
				showSubscriptionConfirmation: false
			});
		}
	}

	renderSubscriptionConfirmation() {
		const {offer, services, subscriptions} = this.state;
		const exists = offer && subscriptions.some(sub => sub.offerTemplate.code === offer.code);
		/*const hasSelectedService = services.some(svc => svc.selected);*/
		if (exists) {
			this.showErrorAlert("You are already subscribed to this offer.");
		} /*else if (!hasSelectedService) {
			this.showErrorAlert("Please choose at least one option.");
		}*/ else {
			this.setState({
				error: null,
				isLoading: false,
				showSubscriptionForm: false,
				showSubscriptionConfirmation: true
			});
		}
	}

	loadServiceDetails(service) {
		ServiceDetailsActions.fetchIncompatibleServiceDetails(service);
	}

	updateServiceDetails(service) {
		const {services} = this.state;
		let detailedServices = null;
		if (service && service.code) {
			const exists = services.some(aService => service.code === aService.code);
			if (!exists) {
				service.selected = service.mandatory;
				detailedServices = services.concat(service);
			} else {
				detailedServices = services.map(svc => svc.code === service.code ? service : svc);
			}
			this.setState({
				services: detailedServices
			});
		}
	}

	toggleService(service) {
		service = Object.assign({}, service, {selected: !service.selected});
		const {services} = this.state;
		this.setState({
			services: services.map(svc => svc.code === service.code ? service : svc)
		});
	}

	revertSubscriptionForm() {
		this.setState({
			subscription: null,
			offer: null,
			services: [],
			error: null,
			isLoading: false,
			showSubscriptionForm: false,
			showSubscriptionConfirmation: false
		});
	}

	renderSubscriptions(customer) {
		const {subscriptionCode} = this.props.routeParams;
		const {customerAccount} = customer;
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		if (subscriptions.length > 1) {
			let subscription = null;
			if (subscriptionCode && subscriptionCode.trim() !== '') {
				[subscription] = subscriptions.filter(sub => subscriptionCode === sub.code);
			} /*else {
				subscription = subscriptions[0];
			}*/
			customer.customerAccount.billingAccount.userAccount.subscriptions = [subscription];
		}
		const {message} = customer;
		if (message) {
			this.showMessageAlert(message);
		}
		this.setState({
			subscriptions,
			customer,
			isLoading: false,
			error: null
		});
	}

	renderOffers(offers) {
		this.setState({
			offers,
			isLoading: false,
			error: null,
			showSubscriptionForm: false,
			showSubscriptionConfirmation: false
		});
	}

	renderError(error) {
		this.setState({
			isLoading: false,
			error,
			showSubscriptionForm: false,
			showSubscriptionConfirmation: false
		});
	}

	renderLoader() {
		this.setState({
			isLoading: true,
			error: null,
			showSubscriptionForm: false,
			showSubscriptionConfirmation: false
		});
	}

	showErrorAlert(message) {
		this.setState({
			alert: {
				icon: 'fa fa-4x fa-exclamation-circle',
				header: "Error",
				message
			},
			showSubscriptionForm: false,
			showSubscriptionConfirmation: false
		})
	}

	showMessageAlert(message) {
		this.setState({
			alert: {
				icon: 'fa fa-4x fa-info-circle',
				header: 'Notice',
				message
			},
			showSubscriptionForm: false,
			showSubscriptionConfirmation: false
		})
	}

	clearAlert() {
		this.setState({
			alert: null
		});
	}

	displayMessage() {
		const {alert} = this.state;
		if (alert) {
			return (
				<Modal show={true}>
					<Modal.Header>
						<Modal.Title>{alert.header}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-sm-2"><i className={alert.icon}/></div>
							<div className="col-sm-10"><h4>{alert.message}</h4></div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-theme-default" onClick={this.clearAlert.bind(this)}>OK</button>
					</Modal.Footer>
				</Modal>
			);
		}
		return null;
	}

	displayConfirmation() {
		const {showSubscriptionConfirmation, offer, services} = this.state;
		const selectedServices = [];
		services.forEach(svc => {
			if (svc.selected) {
				selectedServices.push(svc);
			}
		});
		if (showSubscriptionConfirmation) {
			return (
				<Modal show={showSubscriptionConfirmation}>
					<Modal.Header>
						<Modal.Title>Subscription Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-sm-2"><i className="fa fa-4x fa-info-circle"/></div>
							<div className="col-sm-10">
								<div className="row">
									<h4>You are about to subscribe to the following offer:</h4>
								</div>
								<div className="row">
									Offer: {offer.name}
								</div>
								<div className="row">
									<ul className="list-unstyled options-list">
										{selectedServices.length > 0 ? <span>Options</span> : null}
										{selectedServices.map(selectedService =>
											<li key={selectedService.code}>{selectedService.description}</li>
										)}
									</ul>
								</div>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-danger" onClick={this.closeConfirmationWithoutSaving.bind(this)}>
							Cancel
						</button>
						{' '}
						<button className="btn btn-theme-default" onClick={this.subscribeToOffer.bind(this)}>OK</button>
					</Modal.Footer>
				</Modal>
			);
		}
		return null;
	}

	closeConfirmationWithoutSaving() {
		this.setState({
			error: null,
			isLoading: false,
			showSubscriptionConfirmation: false
		});
	}

	renderDetail() {
		const {isLoading, error, customer, offers, showSubscriptionForm} = this.state;
		let showPanel = false;
		let isLoggedIn = true;
		if (isLoading) {
			return <PageLoader page="Available Offers"/>;
		}

		if (error) {
			return <ErrorDetail error={error}/>;
		}
		const {subscriptionCode} = this.props.routeParams;
		if (subscriptionCode && subscriptionCode.trim() !== '') {
			showPanel = true;
		}		
		if (showSubscriptionForm) {
			return (
				<div>
					{this.displayMessage()}
					{this.displayConfirmation()}
					<SubscribeToOffer parent={this}  {...this.state} />
				</div>
			);
		}

		return (
			<div>
				{this.displayMessage()}
				{this.displayConfirmation()}
				<OfferCards customer={customer} offers={offers} parent={this} showoffer={showPanel}  {...this.props} />
			</div>
		);
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						{this.renderDetail()}
					</div>
				</div>
			</div>
		)
	}
}

module.exports = AvailableOffers;
