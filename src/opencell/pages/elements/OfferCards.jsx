import React from 'react';

import OfferCardGroup from "./OfferCardGroup.jsx";
import ServiceCardGroup from "./ServiceCardGroup.jsx";
import OfferDetail from "./OfferDetail.jsx";

class OfferCards extends React.Component {

	constructor() {
		super();
		this.state = {
			groupedOffers: [],
			groupedServices: []
		}
	}

	componentWillMount() {
		this.groupOffersAndServices(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.groupOffersAndServices(nextProps);
	}

	groupOffersAndServices(props) {
		const {offers = []} = props;
		const groupedOffers = [];
		const allServices = [];
		const groupedServices = [];
		let group = 0;
		let currentGroup = null;
		offers.map((offer, index) => {
			let exists = false;
			offer.offerServices.forEach(offerService => {
				exists = allServices.some(currentService => offerService.code === currentService.code)
				if (!exists) {
					allServices.push(offerService);
				}
			});
			if (index % 3) {
				currentGroup.push(offer);
			} else {
				currentGroup = [];
				currentGroup.push(offer);
				groupedOffers[group++] = currentGroup;
			}
		});
		group = 0;
		allServices.map((service, index) => {
			if (index % 2) {
				currentGroup.push(service);
			} else {
				currentGroup = [];
				currentGroup.push(service);
				groupedServices[group++] = currentGroup;
			}
		});
		this.setState({groupedOffers, groupedServices});
	}

	showOfferPanel()
	{
		const {showoffer} = this.props;
		const {customerAccount} = this.props.customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions} = userAccount || {};
		const [ subscription ] = subscriptions || [];
		if(showoffer==true){
			return(<OfferDetail billingAccount={billingAccount} subscription={subscription}/> );
		} 
		return "";
	}

	render() {
		const {showoffer} = this.props;
		const {customerAccount} = this.props.customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions} = userAccount || {};
		let [ subscription ] = subscriptions || [];
		if(!showoffer)
		{
			subscription=null;
		}
		const {groupedOffers, groupedServices} = this.state;
		return (
			<div className="row">
				<div className="col-md-12">
					{this.showOfferPanel()}	
					{groupedOffers.map((group, index) => <OfferCardGroup group={group} subscription={subscription} key={index}  {...this.props}/>)}
				</div>
			</div>
		);
	}
}

export default OfferCards;