import moment from 'moment';

import Action from './Action';
import * as ActionMethods from './ActionMethods';
import SubscriptionService from '../services/SubscriptionService';
import * as SubscriptionActions from './SubscriptionActions';

export function subscribeService(subscription, service) {
	const action = new Action(ActionMethods.SERVICE_SUBSCRIBE, function (data, subscription, service) {
		SubscriptionService.subscribeService(data).then(actionStatus => {
			if (actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				this.success({
					customer:  SubscriptionActions.fetchSubscriptionByCode(subscription.code),
					service,
					subscription,
					message: "Successfully subscribed to " + service.description + " option."
				});
			}
		}).catch(error => {
			this.fail(error);
		});
	});

	const data = {
		subscription: subscription.code,
		servicesToActivate: {
			service: [
				{
					code: service.code,
					quantity: service.quantity,
					subscriptionDate: service.subscriptionDate
				}
			]
		}
	};

	action.execute(data, subscription, service);
}

export function terminateService(subscription, serviceInstance) {
	const action = new Action(ActionMethods.SERVICE_TERMINATE, function (data, subscription, serviceInstance) {
		SubscriptionService.terminateService(data).then(actionStatus => {
			if (actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				this.success({
					customer: SubscriptionActions.fetchSubscriptionByCode(subscription.code),
					serviceInstance,
					subscription,
					message: "Successfully terminated " + serviceInstance.description + " option."
				});
			}
		}).catch(error => {
			this.fail(error);
		});
	});

	const data = {
		subscriptionCode: subscription.code,
		services: [
			serviceInstance.code
		],
		terminationReason: "SELFCARE_TERMINATION",
		terminationDate: moment().utc().format()
	};

	action.execute(data, subscription, serviceInstance);
}