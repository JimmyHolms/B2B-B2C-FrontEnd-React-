import React from 'react';
import {Link} from 'react-router';

import * as properties from '../../../properties';
import ChangeOffer from "./ChangeOffer.jsx";
import SubscriptionDetail from "./SubscriptionDetail.jsx";

class MyOfferDetails extends React.Component {

	render() {
		const {customerAccount} = this.props.customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		const [ subscription ] = subscriptions || [];
		const showChangeOffer = subscriptions && subscriptions.length === 1;
		if(subscriptions.length>0)
		{
			return (
				<div className="row">
					{subscriptions.map(subscription => <SubscriptionDetail customerAccount={customerAccount}   billingAccount={billingAccount}
							   subscription={subscription}  key={subscription.code} {...this.props} />)}
					<ChangeOffer show={showChangeOffer} subscription={subscription}/>
				</div>
			);
		}else
		{
			return(
				<div className="panel-msg-info">
					<Link to={properties.available_offers_url}><h4>You have no contract, go to the shop first <i className="fa fa-2x fa-smile-o" aria-hidden="true"></i></h4></Link>
				</div>
			);
		}
	}
}

export default MyOfferDetails;