import BaseService from './BaseService';

class BillingAccountService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/account/billingAccount";
	}


	getNextInvoiceDate(ca) {
		let url = this.serviceUrl + '?billingAccountCode=' + ca.code;
		return this.opencellAPI.fetch(url, "GET");
	}

}

const billingAccountService = new BillingAccountService();

export default billingAccountService;