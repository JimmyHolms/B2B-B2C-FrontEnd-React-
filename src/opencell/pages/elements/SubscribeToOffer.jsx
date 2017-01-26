import React from 'react';
import ReactImageFallback from "react-image-fallback";

import OfferServiceItems from './OfferServiceItems.jsx';
import OfferDetail from "./OfferDetail.jsx";

class SubscribeToOffer extends React.Component {

	revertChanges(){
		const {parent} = this.props;
		parent.revertSubscriptionForm();
	}

	submitForm(){
		const {parent} = this.props;
		parent.renderSubscriptionConfirmation();
	}
	render() {
		const {offer} = this.props;

		return (
			<div className="col-md-12">
				<OfferDetail {...this.props} />
				<div className="row">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Your offer</h2>
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="form-group">
									<div className="col-md-2 col-sm-3">
										 <ReactImageFallback src={offer.image} fallbackImage="./images/offer_default.png" className="thumbnail img-thumbnail" />
									</div>
									<div className="col-md-10 col-sm-9">
										<div className="row">
											<div className="col-md-12">
												<h2>{offer.name}</h2>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<div dangerouslySetInnerHTML={{__html: offer.longDescription}}/>
								</div>
							</div>
							<OfferServiceItems {...this.props} />
						</div>
						<div className="panel-footer text-right">
							<button className="btn btn-danger" onClick={this.revertChanges.bind(this)}>Cancel</button>
							&nbsp;
							<button className="btn btn-theme-default" onClick={this.submitForm.bind(this)}>Confirm</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SubscribeToOffer;