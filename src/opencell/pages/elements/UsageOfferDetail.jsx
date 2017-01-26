import React from 'react';
import Time from 'react-time';
import ReactImageFallback from "react-image-fallback";

class UsageOfferDetail extends React.Component {
	render() {
		const { customerAccount, billingAccount, subscription } = this.props;
		const { offerTemplate = {} } = subscription;
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h2 className="panel-title">Your usage &amp; consumption</h2>
				</div>
				<div className="panel-body">
					<div className="row">
						<div className="col-md-1 col-sm-3 col-xs-6">
							<ReactImageFallback src={offerTemplate.image} fallbackImage="./images/offer_default.png" className="thumbnail img-thumbnail" />
						</div>
						<div className="col-md-11 col-sm-9 col-xs-6">
							<div className="row">
								<div className="col-md-12">{offerTemplate.description}</div>
							</div>
							<div className="row">
								<div className="col-md-12">Subscribed on <Time value={subscription.subscriptionDate} format="DD/MM/YYYY" /></div>
							</div>
							<div className="row">
								<div className="col-md-12">Next bill on <Time value={billingAccount.nextInvoiceDate} format="DD/MM/YYYY" /></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UsageOfferDetail;