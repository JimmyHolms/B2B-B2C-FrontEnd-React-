import React from 'react';
import Time from 'react-time';
import ReactImageFallback from "react-image-fallback";

class OfferDetail extends React.Component {
	constructor() {
		super();
	}
	render() {
		const {billingAccount, subscription} = this.props;
		const {offerTemplate} = subscription || {};

		if (billingAccount && offerTemplate) {
			return (
				<div>
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Your offer</h2>
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-md-1 col-sm-3 col-xs-4 offer-img-wrapper no-padding-right">
									<ReactImageFallback src={offerTemplate.image} fallbackImage="./images/offer_default.png" className="thumbnail img-thumbnail img-offer"/>
								</div>
								<div className="col-md-3 col-sm-6 col-xs-8 no-padding-left">
									<div className="row">
										<div className="col-md-12">{offerTemplate.description}</div>
									</div>
								</div>
								<div className="col-md-4 col-sm-3 col-xs-12">
									<div className="row">
										<div className="col-md-12">{offerTemplate.name}</div>
									</div>
									<div className="row">
										<div className="col-md-12">Subscribed on &nbsp;<Time
											value={subscription.subscriptionDate} format="DD/MM/YYYY"/></div>
									</div>
									<div className="row">
										<div className="col-md-12">Next bill on &nbsp;<Time
											value={billingAccount.nextInvoiceDate} format="DD/MM/YYYY"/></div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<a href={offerTemplate.termsAndConditions} download target="_blank">
										<i className="fa fa-2x fa-file-text-o"/> &nbsp;&nbsp;Consult T&amp;C
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}

export default OfferDetail;
