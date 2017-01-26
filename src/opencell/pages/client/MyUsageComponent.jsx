import React from 'react';

import MyContractsSidebar from '../elements/MyContractsSidebar.jsx';
import MyUsageDetails from '../elements/MyUsageDetails.jsx';
import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';

import SubscriptionStore from '../../stores/SubscriptionStore';
import UsageStore from '../../stores/UsageStore'
import ChargeAggregateStore from '../../stores/ChargeAggregateStore'

import {fetchSubscriptions, fetchSubscriptionByCode} from '../../actions/SubscriptionActions';
import {fetchMyUsages, fetchUsagesList} from '../../actions/UsageActions.js';

class MyUsageComponent extends React.Component {

	constructor() {
		super();
		this.curChargeAggregate = null;
		this.curusages = null;
		this.cust = null;
		this.state = {
			customer: null,
			error: {},
			usages: null,
			chargeAggregate: null,
			isLoading: false
		};
	}

	componentWillMount() {
		SubscriptionStore.bindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.bindErrorHandler(this.renderError.bind(this));

		UsageStore.bindUpdateHandler(this.renderUsage.bind(this));
		UsageStore.bindErrorHandler(this.renderError.bind(this));

		ChargeAggregateStore.bindUpdateHandler(this.renderChargeAggregate.bind(this));
		ChargeAggregateStore.bindErrorHandler(this.renderError.bind(this));

	}

	componentWillUnmount() {
		SubscriptionStore.unbindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.unbindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.unbindErrorHandler(this.renderError.bind(this));

		UsageStore.unbindUpdateHandler(this.renderUsage.bind(this));
		UsageStore.unbindErrorHandler(this.renderError.bind(this));

		ChargeAggregateStore.unbindUpdateHandler(this.renderChargeAggregate.bind(this));
		ChargeAggregateStore.unbindErrorHandler(this.renderError.bind(this));
	}

	componentDidMount() {
		const {subscriptionCode} = this.props.routeParams;
		if (subscriptionCode && subscriptionCode.trim() !== '') {
			fetchSubscriptionByCode(subscriptionCode);
		} else {
			fetchSubscriptions();
		}
		fetchMyUsages();
		fetchUsagesList();
	}

	shouldComponentUpdate(nextProps){
		console.log("should component update.");
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
		this.cust = customer;
		if(this.curusages==null || this.curChargeAggregate == null) {
			this.setState({isLoading: true, usages:this.curusages, chargeAggregate:this.curChargeAggregate, customer:customer, error: null});
		} else {
			this.setState({isLoading: false, usages:this.curusages, chargeAggregate:this.curChargeAggregate, customer:customer, error: null});
		}
	}

	renderUsage(usages)
	{
		this.curusages=usages;
		if(this.cust == null || this.curChargeAggregate == null ) {
			this.setState({ isLoading: true, usages:this.curusages, chargeAggregate:this.curChargeAggregate , customer:this.cust , error: null});
		} else {
			this.setState({ isLoading: false, usages:this.curusages, chargeAggregate:this.curChargeAggregate , customer:this.cust , error: null});
		}
	}

	renderChargeAggregate(chargeAggregate)
	{
		//console.log(chargeAggregate);
		this.curChargeAggregate=chargeAggregate;
		if(this.cust == null || this.curusages == null) {
			this.setState({ isLoading: true, usages:this.curusages, chargeAggregate:this.curChargeAggregate , customer:this.cust , error: null});
		} else {
			this.setState({ isLoading: false, usages:this.curusages, chargeAggregate:this.curChargeAggregate , customer:this.cust , error: null});
		}
	}

	renderError(error) {
		this.setState({isLoading: false, usages: null, chargeAggregate: null, customer: null, error});
	}

	renderLoader() {
		this.setState({isLoading: true, usages: null, chargeAggregate: null, customer: null, error: null});
	}

	renderDetail() {
		const {isLoading, customer, usages, chargeAggregate , error} = this.state;

		if (isLoading) {
			return <PageLoader page="MyOffers"/>;
		}

		if (error) {
			return <ErrorDetail error={error}/>;
		}

		return <MyUsageDetails usages={usages} chargeAggregate={chargeAggregate} customer={customer} {...this.props} />;
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

module.exports = MyUsageComponent;
