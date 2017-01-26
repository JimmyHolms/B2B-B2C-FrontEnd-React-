import React from 'react';
import Accordion from './Accordion.jsx';
import ItemContainer from './ItemContainer.jsx';
import OfferDetail from "./OfferDetail.jsx";
import Service from './Service.jsx';
import ServiceInstance from './ServiceInstance.jsx';

class Options extends React.Component {

	componentWillMount() {
		const {subscription} = this.props;
		const {services = [], offerTemplate} = subscription || {};
		const {offerServices = []} = offerTemplate || {};

		this.serviceInstances = services.slice();
		this.offerServices = [];
		const offerServiceItems= offerServices.slice();

		const idsForRemoval = [];
		this.serviceInstances.map(serviceInstance => {
			offerServiceItems.forEach((offerService, id) => {
				if (serviceInstance.code === offerService.code) {
					serviceInstance.mandatory = offerService.mandatory;
					idsForRemoval.push(id);
					return false;
				}
			});
		});
		offerServiceItems.forEach((offerService, id) => {
			if(idsForRemoval.indexOf(id) === -1){
				this.offerServices.push(offerService);
			}
		});

		this.showServiceInstances = this.serviceInstances.length > 0;
		this.showOfferServices = this.offerServices.length > 0;
		this.showAccordion = this.showServiceInstances && this.showOfferServices;

	}

	displayServiceInstances() {
		const {subscription} = this.props;
		if (this.showServiceInstances) {
			return (
				<div className="non-collapsible">
					<div className="non-collapsible-header">Your options</div>
					<div className="non-collapsible-content">
						{this.serviceInstances.map((serviceInstance, index) => <ServiceInstance
							key={serviceInstance.code + index} serviceInstance={serviceInstance}
							subscription={subscription} {...this.props} />)}
					</div>
				</div>
			);
		}
	}

	displayServices() {
		const {subscription} = this.props;
		if (this.showOfferServices) {
			return (
				<div className="non-collapsible">
					<div className="non-collapsible-header">Subscribe a new option</div>
					<div className="non-collapsible-content">
						{this.offerServices.map((offerService, index) => <Service
							key={offerService.code + index } service={offerService}
							subscription={subscription} {...this.props} />)}
					</div>
				</div>
			);
		}
	}

	displayAccordion() {
		return (
			<ItemContainer>
				{this.displayServiceInstances()}
				{this.displayServices()}
			</ItemContainer>
		);
	}

	render() {

		return (
			<div className="col-md-12">
				<OfferDetail {...this.props} />
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="row">
							<div className="col-md-12">
								{this.displayAccordion()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Options;