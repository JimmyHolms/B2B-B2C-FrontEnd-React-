import BaseService from './BaseService';
import LocalStorageService from '../services/LocalStorageService';

class CatalogManagementService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/catalogManagement";
	}

	listOffers() {
		let url = this.serviceUrl + '/productSpecification';
		const currentCustomer = LocalStorageService.get("currentCustomer");
		if (currentCustomer != null) {
			return this.opencellAPI.fetch(url, "GET");
		}
		return this.opencellAPI_selfWS.fetch(url, "GET");
	}

}

const catalogManagementService = new CatalogManagementService();

export default catalogManagementService;