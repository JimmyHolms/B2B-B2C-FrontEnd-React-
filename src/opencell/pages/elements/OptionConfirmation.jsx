import React from 'react';
import Time from 'react-time';
import ReactImageFallback from "react-image-fallback";

import OfferDetail from "./OfferDetail.jsx";

class OptionConfirmation extends React.Component {


	revertChanges() {
		const {parent} = this.props;
		parent.revertForm();
	}


	render() {
		const {service} = this.props;

		return (
			<div>
				<OfferDetail {...this.props} />
				<div>
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Your options</h2>
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-md-12">
									<div className="col-md-2 col-sm-3">
										<ReactImageFallback src={service.image} fallbackImage="./images/service_default.png" className="thumbnail img-thumbnail img-service"/>
									</div>
									<div className="col-md-10 col-sm-9">
										<div className="row">
											<div className="col-md-12">
												<h2>{service.description}</h2>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div dangerouslySetInnerHTML={{__html: service.longDescription}}/>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12"><strong>Subscribed on</strong>&nbsp;
												<Time value={service.subscriptionDate} format="DD/MM/YYYY"/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="panel-footer text-right">
							<button className="btn btn-theme-default" onClick={this.revertChanges.bind(this)}>Back to my
								options
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default OptionConfirmation;
