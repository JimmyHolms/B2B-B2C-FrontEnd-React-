import React from 'react';
import moment from 'moment';
import ReactImageFallback from "react-image-fallback";

import OfferDetail from "./OfferDetail.jsx";
import ItemContainer from './ItemContainer.jsx';

class OptionSubscription extends React.Component {

	componentDidMount(){
		const {service, parent} = this.props;
		parent.incompatibleServicesHandler(service);
	}

	revertChanges() {
		const {parent} = this.props;
		parent.revertForm();
	}

	submitForSubscription() {
		const {parent, subscription, service} = this.props;
		const data = Object.assign({}, service, {
			quantity: 1,
			subscriptionDate: moment().utc().format()
		});
		parent.subscribeHandler(subscription, data);
	}

	displayIncompatibleServices(){
		const {service} = this.props;
		const {incompatibleServices} = service;
		if(incompatibleServices.length > 0){
			return(
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-12">
							<h3>Options incompatible with this one</h3>
							{incompatibleServices.map(incompatibleService => {
								return (
									<ItemContainer className="row" key={incompatibleService.code}>
										<div className="col-md-2 col-sm-3 col-xs-6">
											<ReactImageFallback src={incompatibleService.image} fallbackImage="./images/service_default.png"
												 className="thumbnail img-thumbnail"/>
										</div>
										<div className="col-md-10 col-sm-9 col-xs-6">
											<div className="row">
												<div className="col-sm-12">
													<h4>{incompatibleService.description}</h4>
												</div>
											</div>
										</div>
									</ItemContainer>
								);
							})}
						</div>
					</div>
				</div>
			);
		}

	}

	render() {
		const {service} = this.props;

		return (
			<div className="">
				<OfferDetail {...this.props} />

				<div className="panel panel-default">
					<div className="panel-heading">
						<h2 className="panel-title">Your options</h2>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="form-group">
								<div className="col-md-1 col-sm-3">
									<ReactImageFallback src={service.image} fallbackImage="./images/service_default.png" className="thumbnail img-thumbnail img-service"/>
								</div>
								<div className="col-md-11 col-sm-9 no-padding-left">
									<div className="row">
										<div className="col-md-12">
											<h2 className="no-margin-top">{service.description}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div dangerouslySetInnerHTML={{__html: service.longDescription}}/>
							</div>
						</div>
						{this.displayIncompatibleServices()}
					</div>
					<div className="panel-footer text-right">
						<button className="btn btn-danger" onClick={this.revertChanges.bind(this)}>Cancel</button>
						&nbsp;
						<button className="btn btn-theme-default" onClick={this.submitForSubscription.bind(this)}>
							Confirm
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default OptionSubscription;
