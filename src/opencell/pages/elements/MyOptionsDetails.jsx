import React from 'react';
import ChangeOffer from "./ChangeOffer.jsx";
import Options from "./Options.jsx";

class MyOptionsDetails extends React.Component {

	render() {
		const {customerAccount} = this.props.customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		const [ subscription ] = subscriptions || [];
		const showChangeOffer = subscriptions && subscriptions.length === 1;
		return (
			<div className="row">
				{subscriptions.map(subscription => <Options customerAccount={customerAccount}
															billingAccount={billingAccount} subscription={subscription}
															key={subscription.code} {...this.props} />)}
				<ChangeOffer show={showChangeOffer} subscription={subscription}/>
			</div>
		);
	}
}

export default MyOptionsDetails;