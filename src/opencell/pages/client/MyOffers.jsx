import React from 'react';

import MyContractsSidebar from '../elements/MyContractsSidebar.jsx';
import MyOfferDetails from '../elements/MyOfferDetails.jsx';
import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';

import SubscriptionStore from '../../stores/SubscriptionStore';
import {fetchSubscriptions, fetchSubscriptionByCode} from '../../actions/SubscriptionActions';

class MyOffers extends React.Component {

	constructor() {
		super();
		this.state = {
			customer: {},
			error: null,
			isLoading: false
		};
	}

	componentWillMount() {
		console.log("component will mount.");
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
			error
		});
	}

	renderLoader() {
		this.setState({
			isLoading: true,
			customer: null,
			error: null
		});
	}

	renderDetail() {
		const {isLoading, customer, error} = this.state;

		if (isLoading) {
			return <PageLoader page="My Account"/>;
		}

		if (error) {
			return <ErrorDetail error={error}/>;
		}

		return <MyOfferDetails customer={customer} {...this.props} />;
	}

	render() {
		return (
			<div className="container-fluid">
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

module.exports = MyOffers;
