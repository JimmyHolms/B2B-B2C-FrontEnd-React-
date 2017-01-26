import React from 'react';
import ToggleButton from 'react-toggle-button';
import ReactImageFallback from "react-image-fallback";


import ItemContainer from './ItemContainer.jsx';

class OfferServiceItems extends React.Component {

	componentDidMount() {
		const {parent, offer} = this.props;
		offer.offerServices.forEach(service => parent.loadServiceDetails(service));
	}

	toggleService(service) {
		const {parent} = this.props;
		if(!service.mandatory){
			parent.toggleService(service);
		}
	}
	render() {
		const {services} = this.props;
		var mandatories = [];
		var availables = [];
		services.forEach(function(item,index){
			if(item.mandatory==true)
			{
				mandatories.push(item);
			}else
			{
				availables.push(item);
			}
		});
		if (services.length > 0) {
			return (
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-12">
							{mandatories.map(service => {return (
											<ItemContainer className="row" key={service.code}>
												<div className="col-sm-3 col-xs-8">
													<ReactImageFallback src={service.image} fallbackImage="./images/service_default.png" className="thumbnail img-thumbnail img-service"/>
												</div>
												<div className="col-sm-2 col-sm-push-7 col-xs-4">
													<ToggleButton value={service.selected} onToggle={this.toggleService.bind(this, service)} />
													<span><i className="fa fa-asterisk" /> required</span>
												</div>
												<div className="col-sm-7 col-sm-pull-2 col-xs-12">
													<div className="row">
														<div className="col-xs-11">
															<h4>{service.description}</h4>
														</div>
													</div>
													<div className="row">
														<ul>
															{service.incompatibleServices.length > 0 ?
																<strong>Incompatible options</strong> : null}
															{service.incompatibleServices.map(incompatibleService => <li
																key={incompatibleService.code}>{incompatibleService.description}</li>)}
														</ul>
													</div>
												</div>
											</ItemContainer>
							)})}
							<h3>Available options</h3>
							{availables.map(service => {return (
											<ItemContainer className="row" key={service.code}>
												<div className="col-sm-3 col-xs-8">
													<ReactImageFallback src={service.image} fallbackImage="./images/service_default.png" className="thumbnail img-thumbnail img-service"/>
												</div>
												<div className="col-sm-2 col-sm-push-7 col-xs-4">
													<ToggleButton value={service.selected} onToggle={this.toggleService.bind(this, service)} />
												</div>
												<div className="col-sm-7 col-sm-pull-2 col-xs-12">
													<div className="row">
														<div className="col-xs-11">
															<h4>{service.description}</h4>
														</div>
													</div>
													<div className="row">
														<ul>
															{service.incompatibleServices.length > 0 ?
																<strong>Incompatible options</strong> : null}
															{service.incompatibleServices.map(incompatibleService => <li
																key={incompatibleService.code}>{incompatibleService.description}</li>)}
														</ul>
													</div>
												</div>
											</ItemContainer>
							)})}
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}

export default OfferServiceItems;
