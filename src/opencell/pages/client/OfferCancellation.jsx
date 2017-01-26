import React from 'react';

import MyContractsSidebar from '../elements/MyContractsSidebar.jsx';
import CancellationDetails from '../elements/CancellationDetails.jsx';
import CancellationConfirm from '../elements/CancellationConfirm.jsx';
import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';

import SubscriptionStore from '../../stores/SubscriptionStore';
import {fetchSubscriptions, fetchSubscriptionByCode, terminateSubscription} from '../../actions/SubscriptionActions';

import * as properties from '../../../properties';

class OfferCancellation extends React.Component {

	constructor() {
		super();
		this.state = {
			customer: {},
			error: null,
			isLoading: false,
			cancellationConfirmation: false
		};
	}

	componentWillMount() {
		SubscriptionStore.bindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.bindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.bindErrorHandler(this.renderError.bind(this));
	}

	componentWillUnmount() {
		SubscriptionStore.unbindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.unbindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.unbindErrorHandler(this.renderError.bind(this));
	}

	componentDidMount() {
		const {subscriptionCode} = this.props.routeParams;
		if (subscriptionCode && subscriptionCode.trim() !== '') {
			fetchSubscriptionByCode(subscriptionCode);
		} else {
			fetchSubscriptions();
		}
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

	renderOffer(customer) {
		this.setState({
			isLoading: false,
			customer,
			error: null
		});
	}

	renderError(error) {
		this.setState({
			isLoading: false,
			customer: null,
			error,
			cancellationConfirmation: false
		});
	}

	renderLoader() {
		this.setState({
			isLoading: true,
			customer: null,
			error: null
		});
	}

	terminateSubscription(){
		var date = new Date();
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		var lastDayIso = lastDay.toISOString();

		const customer = this.state.customer || {};
		const {customerAccount} = customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		const [ subscription ] = subscriptions || [];
		this.setState({
			isLoading: false,
			error: null,
			cancellationConfirmation: true,
			cancellationConfirmationData : customer
		});
		subscription.cancel_reason = properties.termination_reason;
		subscription.termination_date = lastDayIso;
		terminateSubscription(subscription);
	}

	renderDetail() {
		const {isLoading, customer, error, cancellationConfirmation} = this.state;

		if (isLoading) {
			return <PageLoader page="Cancellation"/>;
		}

		if (error) {
			return <ErrorDetail error={error}/>;
		}

		if (cancellationConfirmation) {
			return <CancellationConfirm  {...this.state}/>;
		}

		return <CancellationDetails  terminateSubscription={this.terminateSubscription.bind(this)} {...this.state}/>;
	}

	render() {
		return (
			<div className="container-fluid cancellation">
				<div className="row">
					<MyContractsSidebar customer={this.state.customer} loading={this.state.isLoading}/>
					<div className="col-md-9">
						{this.renderDetail()}
					</div>
				</div>
			</div>
		)
	}
}

module.exports = OfferCancellation;
