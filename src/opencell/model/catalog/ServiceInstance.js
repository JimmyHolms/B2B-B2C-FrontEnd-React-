import * as properties from '../../../properties';

export default class ServiceInstance {
	constructor(serviceInstance) {
		serviceInstance = serviceInstance || {};

		this.code = serviceInstance.code;
		this.customFields = serviceInstance.customFields;
		this.description = serviceInstance.description;
		this.endAgreementDate = serviceInstance.endAgreementDate;
		this.quantity = serviceInstance.quantity;
		this.status = serviceInstance.status;
		this.statusDate = serviceInstance.statusDate;
		this.subscriptionDate = serviceInstance.subscriptionDate;
		this.terminationDate = serviceInstance.terminationDate;
		this.terminationReason = serviceInstance.terminationReason;
		this.image = properties.meveo_path + "/picture/" + properties.provider + "/service/" + serviceInstance.code;

	}
}