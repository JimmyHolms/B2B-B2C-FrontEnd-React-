import Action from './Action';
import * as ActionMethods from './ActionMethods';
import ServiceDetailsService from '../services/ServiceDetailsService';

import Service from '../model/catalog/Service';

export function fetchIncompatibleServiceDetails(service) {
	const action = new Action(ActionMethods.FETCH_INCOMPATIBLE_SERVICE_DETAILS, function (service) {
		service = service || {};
		const { incompatibleServices } = service;

		const serviceDetailPromises = [];
		incompatibleServices.map(incompatibleService => serviceDetailPromises.push(ServiceDetailsService.find(incompatibleService.code)));
		Promise.all(serviceDetailPromises).then(serviceDtoList => {
			serviceDtoList = serviceDtoList || [];
			const serviceDetails = [];
			serviceDtoList.map((serviceDto, index) => {
				const { actionStatus } = serviceDto;
				if(actionStatus == null || actionStatus.status === "FAIL") {
					this.fail(actionStatus);
				} else {
					serviceDetails.push(new Service(serviceDto.serviceTemplate));
				}
			});
			const newService = Object.assign({}, service, {
				incompatibleServices: serviceDetails
			});
			this.success(newService);
		}).catch( error => {
			this.fail(error);
		});
	});

	action.execute(service);
}