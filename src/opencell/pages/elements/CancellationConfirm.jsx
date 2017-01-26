import React from 'react';
import Time from 'react-time';
import {Link} from 'react-router';
import * as properties from '../../../properties';

class CancellationConfirm extends React.Component {
	render() {
		const {customerAccount} = this.props.cancellationConfirmationData || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		const [ subscription ] = subscriptions || [];
		const {offerTemplate} = subscription || {};

		if (billingAccount && offerTemplate) {

			var date = new Date();
			var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

			if (subscription.endAgreementDate) {
				var dateEndEngagement = <div>You were engaged till <Time value={subscription.endAgreementDate} format="DD/MM/YYYY"/></div>;
			}else {
				var dateEndEngagement = "No engagement";
			}

			return (
					<div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Your offer</h3>
								</div>
								<div className="panel-body">
									<div className="row">
										<div className="col-md-12"><strong>{offerTemplate.name}</strong></div>
									</div>
									<div className="row">
										<div className="col-md-12"><strong>Subscribed on</strong>&nbsp;
											<Time value={subscription.subscriptionDate} format="DD/MM/YYYY"/></div>
									</div>
									<div className="row">
										<div className="col-md-12"><strong>Next bill on</strong>&nbsp;
											<Time value={billingAccount.nextInvoiceDate} format="DD/MM/YYYY"/></div>
									</div>
								</div>
							</div>

							<div className="panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Cancellation</h3>
								</div>
								<div className="panel-body">
									{dateEndEngagement}
									<div>Your contract will be terminated on <Time value={lastDay} format="DD/MM/YYYY"/></div>
									<div className="text-right">
										<Link to={properties.my_account_url} className="btn btn-theme-default">Back to my account</Link>
									</div>
								</div>
							</div>
					</div>
			);
		}
	}
}

export default CancellationConfirm;
