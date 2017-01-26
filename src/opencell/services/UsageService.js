import BaseService from './BaseService';

class UsageService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/usage";
		this.usageListServiceUrl = "/api/rest/usage/chargeAggregate";
	}


	getUsageByCustomerAccount(ca) {
		let url = this.serviceUrl + '?userAccountCode=' + ca.code;
		return this.opencellAPI.fetch(url, "GET");
	}

	getUsageList(ca) {
		let url = this.usageListServiceUrl + '?userAccountCode=' + ca.code;
		return this.opencellAPI.fetch(url, "GET");
	}

}

const usageService = new UsageService();

export default usageService;
