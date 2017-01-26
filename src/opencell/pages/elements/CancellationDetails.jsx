import React from 'react';
import Time from 'react-time';
import {Link} from 'react-router';
import * as properties from '../../../properties';

class CancellationDetails extends React.Component {

	cancelSubscription(){
		this.props.terminateSubscription();
	}

	render() {
		const {customerAccount} = this.props.customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		const [ subscription ] = subscriptions || [];
		const {offerTemplate} = subscription || {};

		if (billingAccount && offerTemplate) {

			var date = new Date();
			var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

			if (subscription.endAgreementDate) {
				var dateEndEngagement = <div>You are currently engaged till <Time value={subscription.endAgreementDate} format="DD/MM/YYYY"/></div>;
			}else {
				var dateEndEngagement = "No engagement";
			}

			return (
					<div>
							<div className="panel panel-default">
								<div className="panel-heading title">
									<h2 className="panel-title">Your offer</h2>
								</div>
								<div className="panel-body">
									<div className="row">
										<div className="col-md-12">{offerTemplate.name}</div>
									</div>
									<div className="row">
										<div className="col-md-12">Subscribed on&nbsp;
											<Time value={subscription.subscriptionDate} format="DD/MM/YYYY"/></div>
									</div>
									<div className="row">
										<div className="col-md-12">Next bill on&nbsp;
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
									<div>Your contract will be resigned on <Time value={lastDay} format="DD/MM/YYYY"/></div>
									<p>Do you still confirm you want to continue ?</p>
									<div className="text-right">
										<Link to={properties.my_offers_url} className="btn btn-danger">Cancel</Link>
										&nbsp;
										<button className="btn btn-theme-default" onClick={this.cancelSubscription.bind(this)}>Confirm</button>
									</div>
								</div>
							</div>
					</div>
			);
		}else{
			return(
				<div className="panel-msg-info">
					<Link to={properties.available_offers_url}><h1>You have no contract, go to the shop first <i className="fa fa-2x fa-smile-o" aria-hidden="true"></i></h1></Link>
				</div>
			);
		}
		return null;
	}
}

export default CancellationDetails;
