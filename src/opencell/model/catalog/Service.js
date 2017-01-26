import * as properties from '../../../properties';

export default class Service {
	constructor(service, mandatory, incompatibleServices) {
		service = service || {};

		this.code = service.code;
		this.description = service.description;
		this.longDescription = service.longDescription;
		this.invoicingCalendar = service.invoicingCalendar;
		
		this.serviceChargeTemplateRecurrings = [];
		const { serviceChargeTemplateRecurrings = {} } = service;
		let { serviceChargeTemplateRecurring } = serviceChargeTemplateRecurrings || {};
		serviceChargeTemplateRecurring = serviceChargeTemplateRecurring || [];
        serviceChargeTemplateRecurring.map(chargeTemplate => this.serviceChargeTemplateRecurrings.push(chargeTemplate));

		this.serviceChargeTemplateSubscriptions = [];
		const { serviceChargeTemplateSubscriptions = {} } = service;
		let { serviceChargeTemplateSubscription } = serviceChargeTemplateSubscriptions || {};
		serviceChargeTemplateSubscription = serviceChargeTemplateSubscription || [];
        serviceChargeTemplateSubscription.map(chargeTemplate => this.serviceChargeTemplateSubscriptions.push(chargeTemplate));

		this.serviceChargeTemplateUsages = [];
		const { serviceChargeTemplateUsages = {} } = service;
		let { serviceChargeTemplateUsage } = serviceChargeTemplateUsages || {};
		serviceChargeTemplateUsage = serviceChargeTemplateUsage || [];
        serviceChargeTemplateUsage.map(chargeTemplate => this.serviceChargeTemplateUsages.push(chargeTemplate));

		this.customFields = service.customFields;
		this.somCode = service.somCode;
		this.image = properties.meveo_path + "/picture/" + properties.provider + "/service/" + service.code;

		this.mandatory = mandatory || false;

		incompatibleServices = incompatibleServices || [];
		this.incompatibleServices = [];
		incompatibleServices.map(incompatibleService => {
			this.incompatibleServices.push(new Service(incompatibleService));
		});

	}
}