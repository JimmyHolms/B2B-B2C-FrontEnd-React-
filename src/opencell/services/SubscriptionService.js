import BaseService from './BaseService';

class SubscriptionService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/billing/subscription";
	}

	fetchSubscriptionByCode(subscriptionCode) {
		const url = this.serviceUrl + '/?subscriptionCode=' + subscriptionCode;
		return this.opencellAPI.fetch(url, "GET");
	}

	listByUserAccount(userAccount) {
		const url = this.serviceUrl + '/list?userAccountCode=' + userAccount.code;
		return this.opencellAPI.fetch(url, "GET");
	}

	subscribeService(service) {
		const url = this.serviceUrl + '/activateServices';
		return this.opencellAPI.invokeRequest(service, url, "POST");
	}

	terminateService(serviceInstance) {
		const url = this.serviceUrl + '/terminateServices';
		return this.opencellAPI.invokeRequest(serviceInstance, url, "POST");
	}
	
	createSubscription(subscription){
		const url = this.serviceUrl + '/';
		return this.opencellAPI.invokeRequest(subscription, url, "POST");
	}
	
	terminateSubscription(subscription){
		const url = this.serviceUrl + '/terminate';
		return this.opencellAPI.invokeRequest(subscription, url, "POST");
	}

}

const subscriptionService = new SubscriptionService();

export default subscriptionService;