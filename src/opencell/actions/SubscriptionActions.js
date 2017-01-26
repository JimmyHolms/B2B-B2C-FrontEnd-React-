import moment from 'moment';

import Action from './Action';
import * as ActionMethods from './ActionMethods';
import OfferService from '../services/OfferService';
import SubscriptionService from '../services/SubscriptionService';
import LocalStorageService from '../services/LocalStorageService';
import Offer from '../model/catalog/Offer';
import Subscription from '../model/catalog/Subscription';
import Error from '../model/Error';

export function fetchSubscriptions() {
	const action = new Action(ActionMethods.FETCH_SUBSCRIPTIONS, function (currentCustomer) {
		const {customerAccount: {billingAccount: {userAccount}}} = currentCustomer;
		let subscriptionsList = [];
		SubscriptionService.listByUserAccount(userAccount).then(subscriptionDto => {
			const {actionStatus} = subscriptionDto;
			if (actionStatus == null || actionStatus.status === "FAIL") {
				throw new Error({message: actionStatus.message});
			} else {

				const {subscriptions} = subscriptionDto;
				let {subscription} = subscriptions || {};
				subscription = subscription || [];

				subscription.map(sub => {
					/*if (sub.status !== 'ACTIVE') {
						return;
					}
					return subscriptionsList.push(new Subscription(sub)); */
						if (sub.status == 'ACTIVE' || sub.status == 'CREATED') {
							subscriptionsList.push(new Subscription(sub));
						}
				});

				const offerPromises = [];
				subscriptionsList.map(sub => offerPromises.push(OfferService.find(sub.offerTemplate)));

				return Promise.all(offerPromises);
			}
		}).then(offers => {
			offers = offers || [];
			offers.map((offerDto, index) => {
				const {actionStatus} = offerDto;
				if (actionStatus == null || actionStatus.status === "FAIL") {
					this.fail(actionStatus);
				} else {
					const subscription = subscriptionsList[index];
					subscription.offerTemplate = new Offer(offerDto);
				}
			});
			currentCustomer.customerAccount.billingAccount.userAccount.subscriptions = subscriptionsList;
			this.success(currentCustomer);
		}).catch(error => {
			this.fail(error);
		});
	});

	const currentCustomer = LocalStorageService.get("currentCustomer");
	if (currentCustomer == null) {
		action.fail(new Error({
			message: "Customer is not logged in."
		}));
	}

	action.execute(currentCustomer);
}

export function fetchSubscriptionByCode(subscriptionCode) {
	const action = new Action(ActionMethods.FETCH_SUBSCRIPTION_BY_CODE, function (subscriptionCode) {
		let subscription = {};
		SubscriptionService.fetchSubscriptionByCode(subscriptionCode).then(subscriptionDto => {
			const {actionStatus} = subscriptionDto;
			if (actionStatus == null || actionStatus.status === "FAIL") {
				throw new Error({message: actionStatus.message});
			} else {
				subscription = new Subscription(subscriptionDto.subscription);
				return OfferService.find(subscription.offerTemplate);
			}
		}).then(offerDto => {
			offerDto = offerDto || {};
			const {actionStatus} = offerDto;
			if (actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				subscription.offerTemplate = new Offer(offerDto);
			}
			const currentCustomer = LocalStorageService.getCurrentCustomer();
			currentCustomer.customerAccount.billingAccount.userAccount.subscriptions = [subscription];
			this.success(currentCustomer);
		}).catch(error => {
			this.fail(error);
		});
	});

	action.execute(subscriptionCode);
}

export function createSubscription(offer, services,terminate_subscription) {
	const action = new Action(ActionMethods.SUBSCRIPTION_CREATE, function (data, subscriptionCode, offer, services,terminate_subscription) {
		SubscriptionService.createSubscription(data).then(actionStatus => {
			if (actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {

				const serviceData = {
					subscription: subscriptionCode,
					servicesToActivate: {
						service: []
					}
				};

				services.forEach(service => {
					if (service.selected) {
						serviceData.servicesToActivate.service.push({
							code: service.code,
							quantity: 1,
							subscriptionDate: data.subscriptionDate
						});
					}
				});
				let length = serviceData.servicesToActivate.service.length;
				if(length > 0)
				{
					SubscriptionService.subscribeService(serviceData).then(actionStatus => {
						if (actionStatus == null || actionStatus.status === "FAIL") {
							this.fail(actionStatus);
						} else {
							if(terminate_subscription!=null)
							{
								SubscriptionService.terminateSubscription(terminate_subscription);
							}
							this.success({
								customer: fetchSubscriptionByCode(subscriptionCode),
								message: "Successfully subscribed to " + offer.name
							});
						}
						}).catch(error => {
							this.fail(error);
					});

				}else{
					if(terminate_subscription!=null)
					{
						SubscriptionService.terminateSubscription(terminate_subscription);
					}
					this.success({customer: fetchSubscriptionByCode(subscriptionCode),
									message: "Successfully subscribed to " + offer.name	});
				}
			}
		}).catch(error => {
				this.fail(error);
		});
	});
	const currentCustomer = LocalStorageService.getCurrentCustomer();
	if (currentCustomer == null) {
		action.fail(new Error({
			message: "Customer is not logged in."
		}));
	}

	const {customerAccount} = currentCustomer;
	const {billingAccount} = customerAccount || {};
	const {userAccount} = billingAccount || {};

	const subscriptionCode = "SUB_" + offer.code.toUpperCase() + "_" + moment();
	const data = {
		code: subscriptionCode,
		description: currentCustomer.name.firstName + "'s subscription to " + offer.name + " offer.",
		userAccount: userAccount.code,
		offerTemplate: offer.code,
		subscriptionDate: moment().utc().format()
	};
	action.execute(data, subscriptionCode, offer, services);
}
export function terminateSubscription(subscription) {
	const action = new Action(ActionMethods.SUBSCRIPTION_TERMINATE, function (data, subscription) {
		SubscriptionService.terminateSubscription(data).then(actionStatus => {
			if (actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				this.success({
					customer: fetchSubscriptions()
				});
			}
		}).catch(error => {
			this.fail(error);
		});
	});

	const data = {
		subscriptionCode: subscription.code,
		terminationReason: subscription.cancel_reason ? subscription.cancel_reason : "SELFCARE_TERMINATION",
		terminationDate: subscription.termination_date ? subscription.termination_date : moment().utc().format()
	};

	action.execute(data, subscription);
}
