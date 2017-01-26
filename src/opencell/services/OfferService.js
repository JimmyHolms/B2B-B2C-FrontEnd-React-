import BaseService from './BaseService';
import LocalStorageService from '../services/LocalStorageService';

class OfferService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/catalog/offerTemplate";
	}

	find(code) {
		let url = this.serviceUrl + '?offerTemplateCode=' + code;
		const currentCustomer = LocalStorageService.get("currentCustomer");
		if (currentCustomer != null) {
			return this.opencellAPI.fetch(url, "GET");
		}
		return this.opencellAPI_selfWS.fetch(url, "GET");
	}
}

const offerService = new OfferService();

export default offerService;