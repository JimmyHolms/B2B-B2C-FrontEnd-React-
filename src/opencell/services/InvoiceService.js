import BaseService from './BaseService';

class InvoiceService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/invoice";
	}


	listPresentInAR(ca) {
		let url = this.serviceUrl + '/listPresentInAR?customerAccountCode=' + ca.code;
		return this.opencellAPI.fetch(url, "GET");
	}

	find(code) {
		let url = '/api/rest/catalog/offerTemplate?offerTemplateCode=' + code;
		return this.opencellAPI.fetch(url, "GET");
	}

}

const invoiceService = new InvoiceService();

export default invoiceService;