import BaseService from './BaseService';

class TerminationReasonService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/terminationReason";
	}

	listTerminationReasons() {
		const url = this.serviceUrl + '/list';
		return this.opencellAPI.fetch(url, "GET");
	}


}
const terminationReasonService = new TerminationReasonService();

export default terminationReasonService;