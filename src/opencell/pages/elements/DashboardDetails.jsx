import React from 'react';

class DashboardDetails extends React.Component {
	render() {
		const { customerAccount } = this.props.customer || {};
		const { billingAccount } = customerAccount || {};
		const { userAccount } = billingAccount || {};
		const { subscriptions } = userAccount || {};
		const [ subscription ] = subscriptions || [];
		const { offerTemplate } = subscription || {};
		if(offerTemplate && offerTemplate.description){
			return (
				<div className="col-xs-12 my-offers">
					<h4>{offerTemplate.name}</h4>
				</div>
			);
		}
		return null;
	}
}

export default DashboardDetails;
