import BaseService from './BaseService';

class ServiceDetailsService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/catalog/serviceTemplate";
	}


	find(code) {
		let url = this.serviceUrl + '?serviceTemplateCode=' + code;
		return this.opencellAPI.fetch(url, "GET");
	}

}

const serviceDetailsService = new ServiceDetailsService();

export default serviceDetailsService;