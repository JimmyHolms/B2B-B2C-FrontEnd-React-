import BaseService from './BaseService';

class OrderTrackingService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/orderManagement/productOrder";
	}

	find(code) {
		let url = this.serviceUrl + "/" + code;
		return this.opencellAPI.fetch(url, "GET");
	}

	listPendingOrders() {
		let url = this.serviceUrl;
		return this.opencellAPI.fetch(url, "GET");
	}

}

const orderTrackingService = new OrderTrackingService();

export default orderTrackingService;