import React from 'react';
import {Link} from 'react-router';

import * as properties from  '../../../properties';

class MyContractsSidebar extends React.Component {

	renderOffersPanels() {
		const {customerAccount} = this.props.customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		if (subscriptions.length>0) {
			var offer_panel = subscriptions.map(subscription => {
				const {offerTemplate = {}} = subscription || {};
				return (
					<div className="panel panel-default" key={subscription.code}>
						<div className="panel-heading">
							<h3 className="panel-title">{offerTemplate.name}</h3>
						</div>
						<div className="panel-body">
							<ul className="list-unstyled">
								<li>
									<Link to={properties.my_offers_url + "/" + subscription.code}>Your Offer</Link>
								</li>
								<li>
									<Link to={properties.my_usage_url + "/" + subscription.code}>Your Usage</Link>
								</li>
								<li>
									<Link to={properties.my_bills_url + "/" + subscription.code}>Your Bills</Link>
								</li>
								<li>
									<Link to={properties.offer_cancellation_url + "/" + subscription.code}>Cancellation</Link>
								</li>
							</ul>
						</div>
					</div>
				);
			});
			return offer_panel;
		}
	}

	render() {

		return (
			<aside className={this.props.loading ? "col-md-3 hidden-lg" : "col-md-3"}>
				{this.renderOffersPanels()}
			</aside>
		)
	}
}

export default MyContractsSidebar;
