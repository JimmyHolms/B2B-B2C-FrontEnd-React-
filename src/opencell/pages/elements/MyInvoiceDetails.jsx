import React from 'react';
import InvoiceDetail from "./InvoiceDetail.jsx";
import SubscriptionDetail from "./SubscriptionDetail.jsx";

class MyInvoiceDetails extends React.Component {
	render() {
		const { customerAccount } = this.props.customer;
		const { billingAccount } = customerAccount;
		const { subscriptions = [] } = billingAccount.userAccount;
		return (
			<div className="row">
				{subscriptions.map(subscription => <SubscriptionDetail customerAccount = {customerAccount} billingAccount = {billingAccount} 
					subscription = {subscription} key= {subscription.code} {...this.props} />)}
				<div className="col-md-12">
					<div className="row">
						<div className="panel panel-default">
							<div className="panel-body">
								<div className="row">
									<div className="text-left col-md-6">Do you want to change your offer?</div>
									<div className="text-right col-md-6">
										<a href="#" className="text-right btn btn-theme-default">See all our offers</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyInvoiceDetails;