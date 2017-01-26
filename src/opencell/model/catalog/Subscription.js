import ServiceInstance from './ServiceInstance';

export default class Subscription {
	constructor(subscription) {
		subscription = subscription || {}

		this.code = subscription.code;
		this.description = subscription.description;
		this.userAccount = subscription.userAccount;
		this.offerTemplate = subscription.offerTemplate;
		this.subscriptionDate = subscription.subscriptionDate;
		this.terminationDate = subscription.terminationDate;
		this.endAgreementDate = subscription.endAgreementDate;
		this.status = subscription.status;
		this.statusDate = subscription.statusDate;
		this.customFields = subscription.customFields;
		this.terminationReason = subscription.terminationReason;
		this.accesses = subscription.accesses;

		this.services = [];
		let {services:{serviceInstance}} = subscription;
		serviceInstance = serviceInstance || [];
		serviceInstance = serviceInstance.filter(service => service.status == 'ACTIVE');
		serviceInstance.map(service => this.services.push(new ServiceInstance(service)));

		this.products = subscription.products;
	}

}