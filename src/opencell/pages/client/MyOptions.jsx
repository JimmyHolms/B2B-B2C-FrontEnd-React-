import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';


import MyContractsSidebar from '../elements/MyContractsSidebar.jsx';
import MyOptionsDetails from '../elements/MyOptionsDetails.jsx';
import OptionSubscription from '../elements/OptionSubscription.jsx';
import OptionConfirmation from '../elements/OptionConfirmation.jsx';
import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';

import SubscriptionStore from '../../stores/SubscriptionStore';
import ServiceActivationStore from '../../stores/ServiceActivationStore';
import ServiceDetailsStore from '../../stores/ServiceDetailsStore';
import TerminationReasonsStore from '../../stores/TerminationReasonsStore';
import {fetchSubscriptionByCode, fetchSubscriptions} from '../../actions/SubscriptionActions';
import * as ServiceActivationActions from '../../actions/ServiceActivationActions';
import * as ServiceDetailsActions from '../../actions/ServiceDetailsActions';
import * as TerminationReasonActions from '../../actions/TerminationReasonsActions';
import * as properties from "../../../properties";


class MyOptions extends React.Component {

	constructor() {
		super();
		this.state = {
			customer: {},
			error: null,
			isLoading: false,
			terminationReasons: [],
			message: null,
			alertStatus: '',
			selectedSubscription: null,
			subscribe: {
				service: null,
				showForm: false,
				showConfirmation: false,
			},
			terminate: {
				serviceInstance: null,
				showForm: false,
				showWarning: false,
			}
		};
		this.subscribeHandler = this.subscribeHandler.bind(this);
		this.terminationHandler = this.terminationHandler.bind(this);
		this.revertForm = this.revertForm.bind(this);
	}

	componentWillMount() {
		SubscriptionStore.bindLoadHandler(this.renderPageLoader.bind(this));
		SubscriptionStore.bindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.bindErrorHandler(this.renderOfferError.bind(this));
		ServiceActivationStore.bindUpdateHandler(this.showServiceActivationMessage.bind(this));
		ServiceActivationStore.bindErrorHandler(this.showResultError.bind(this));
		ServiceDetailsStore.bindUpdateHandler(this.updateServiceDetails.bind(this));
		ServiceDetailsStore.bindErrorHandler(this.showResultError.bind(this));
		TerminationReasonsStore.bindUpdateHandler(this.updateTerminationReasons.bind(this));
	}

	componentWillUnmount() {
		SubscriptionStore.unbindLoadHandler(this.renderPageLoader.bind(this));
		SubscriptionStore.unbindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.unbindErrorHandler(this.renderOfferError.bind(this));
		ServiceActivationStore.unbindUpdateHandler(this.showServiceActivationMessage.bind(this));
		ServiceActivationStore.unbindErrorHandler(this.showResultError.bind(this));
		ServiceDetailsStore.unbindUpdateHandler(this.updateServiceDetails.bind(this));
		ServiceDetailsStore.unbindErrorHandler(this.showResultError.bind(this));
		TerminationReasonsStore.unbindUpdateHandler(this.updateTerminationReasons.bind(this));
	}

	componentDidMount() {
		const {subscriptionCode} = this.props.routeParams;
		if (subscriptionCode && subscriptionCode.trim() !== '') {
			fetchSubscriptionByCode(subscriptionCode);
		} else {
			fetchSubscriptions();
		}

		TerminationReasonActions.listTerminationReasons();
	}

	shouldComponentUpdate(nextProps){
		const shouldUpdate = this.props.location.pathname !== nextProps.location.pathname;
		if(shouldUpdate){
			const {subscriptionCode} = nextProps.routeParams;
			if (subscriptionCode && subscriptionCode.trim() !== '') {
				fetchSubscriptionByCode(subscriptionCode);
			} else {
				fetchSubscriptions();
			}
		}
		return true;
	}

	subscribeHandler(subscription, service) {
		ServiceActivationActions.subscribeService(subscription, service);
	}

	terminationHandler(subscription, serviceInstance) {
		ServiceActivationActions.terminateService(subscription, serviceInstance);
	}

	incompatibleServicesHandler(service) {
		ServiceDetailsActions.fetchIncompatibleServiceDetails(service);
	}

	updateTerminationReasons(termReasons) {
		termReasons = termReasons || [];
		const terminationReasons = [];
		termReasons.map(reason => {
			terminationReasons.push({
				text: reason.description,
				value: reason.code
			});
		});
		this.setState({
			terminationReasons
		})
	}

	showServiceActivationMessage(result) {
		const {customer, message, service, serviceInstance, subscription} = result;
		const {subscribe, terminate} = this.state;
		this.resetSubscribeState(subscribe);
		this.resetTerminateState(terminate);
		if(service != null){
			subscribe.service = service;
			subscribe.showConfirmation = true;
		} else if (serviceInstance != null) {
			terminate.serviceInstance = serviceInstance;
			terminate.showWarning = true;
		}

		this.setState({
			customer,
			alertStatus: 'SUCCESS',
			message,
			selectedSubscription: subscription,
			subscribe,
			terminate
		});
		this.displayMessage();

	}

	updateServiceDetails(service) {
		const {subscribe} = this.state;
		subscribe.service = service;

		this.setState({
			subscribe
		});
	}

	resetSubscribeState(subscribe){
		subscribe.service = null;
		subscribe.showForm = false;
		subscribe.showConfirmation = false;
	}

	resetTerminateState(terminate){
		terminate.serviceInstance = null;
		terminate.showForm = false;
		terminate.showWarning = false;
	}

	showResultError(result) {
		this.setState({
			alertStatus: 'FAIL',
			message: result.message
		});
		this.displayMessage();
	}

	renderOffer(customer) {
		this.setState({
			isLoading: false,
			customer,
			error: null
		});
	}

	renderOfferError(error) {
		this.setState({
			isLoading: false,
			customer: null,
			error,
			message: null,
			alertStatus: null
		});
	}

	renderPageLoader() {
		this.setState({
			isLoading: true,
			customer: null,
			error: null,
			message: null,
			alertStatus: null
		});
	}

	displaySubscribeForm(subscription, service) {
		this.setState({
			message: null,
			alertStatus: null,
			selectedSubscription: subscription,
			subscribe: {
				service: service,
				showForm: true,
				form: {
					quantity: 0,
					subscriptionDate: ''
				}
			}
		});
	}

	revertForm() {
		const {subscribe, terminate} = this.state;
		this.resetSubscribeState(subscribe);
		this.resetTerminateState(terminate);
		this.setState({
			alertStatus: null,
			message: null,
			selectedSubscription: null,
			subscribe,
			terminate
		});
	}

	displayDetails() {
		const {isLoading, customer, error, terminationReasons, selectedSubscription, subscribe, terminate} = this.state;

		if (isLoading) {
			return <PageLoader page="My Options"/>;
		}

		if (error) {
			return <ErrorDetail error={error}/>;
		}

		if (subscribe.showForm) {
			const {customerAccount} = customer;
			const {billingAccount = {}} = customerAccount || {};
			return <OptionSubscription billingAccount={billingAccount}
									   subscription={selectedSubscription}
									   service={subscribe.service}
									   parent={this}
				{...this.props}
			/>
		}

		if (subscribe.showConfirmation) {
			const {customerAccount} = customer;
			const {billingAccount = {}} = customerAccount || {};
			return <OptionConfirmation billingAccount={billingAccount}
									   subscription={selectedSubscription}
									   service={subscribe.service}
									   parent={this}
				{...this.props}
			/>
		}

		return <MyOptionsDetails customer={customer}
								 terminationReasons={ terminationReasons }
								 parent={this}
			{...this.props}
		/>;
	}

	createNotification(type,message){
		   switch (type) {
			case 'SUCCESS':
			  NotificationManager.success('', message,2500);
			  break;
			case 'FAIL':
			  NotificationManager.error('',message, 2500);
			  break;
		      }
	};

	displayMessage() {
		const {alertStatus, message} = this.state;
		if (!(message === null || typeof message == 'undefined' || message.trim() === '')) {
				this.createNotification(alertStatus,message);
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<NotificationContainer className="notification-container" />
					<MyContractsSidebar customer={this.state.customer} loading={this.state.isLoading} />
					<div className="col-md-9">
						{this.displayDetails()}
					</div>
				</div>
			</div>
		)
	}
}

module.exports = MyOptions;
