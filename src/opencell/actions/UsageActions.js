import Action from './Action';
import * as ActionMethods from './ActionMethods';
import OfferService from '../services/OfferService';
import SubscriptionService from '../services/SubscriptionService';
import UsageService from '../services/UsageService';
import PaymentService from '../services/PaymentService';
import LocalStorageService from '../services/LocalStorageService';
import Offer from '../model/catalog/Offer';
import Usage from '../model/usage/Usage';
import ChargeAggregate from '../model/usage/ChargeAggregate';
import Payment from '../model/payment/Payment';
import Subscription from '../model/catalog/Subscription';
import Error from '../model/Error';
export function fetchMyUsages() {
	const action = new Action(ActionMethods.FETCH_MYUSAGES, function() {
		const { customerAccount } = LocalStorageService.get("currentCustomer");
		let cats = [];

		UsageService.getUsageByCustomerAccount(customerAccount).then(usagelist => {
			const { actionStatus } = usagelist;
			if(actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				const {catUsage=[]}  = usagelist;
				catUsage.map( cat => {
					cats.push(new Usage(cat));
				});
				this.success(cats);
			}
		}).catch(error => {
			this.fail(error);
		});
	});

	const currentCustomer = LocalStorageService.get("currentCustomer");
	if(currentCustomer == null){
		action.fail(new Error({
			message: "Customer is not logged in."
		}));
	}

	action.execute(currentCustomer);
}

export function fetchUsagesList() {
	const action = new Action(ActionMethods.FETCH_USAGESLIST, function() {
		const { customerAccount } = LocalStorageService.get("currentCustomer");
		let cats = [];

		UsageService.getUsageList(customerAccount).then(usagelist => {
			const { actionStatus } = usagelist;
			if(actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				console.log("9");
				console.log(usagelist);
				//const {listChargeAggregate=[]}  = usagelist;
				/*usagelist.map( cat => {
					console.log("xxx");
					console.log(cat);
					cats.push(new chargeAggregate(cat));
				});
				console.log(cats);
				this.success(cats);*/
				cats.push(new ChargeAggregate(usagelist));
				console.log("10");
				console.log(cats);
				this.success(cats);
			}
		}).catch(error => {
			this.fail(error);
		});
	});

	const currentCustomer = LocalStorageService.get("currentCustomer");
	if(currentCustomer == null){
		action.fail(new Error({
			message: "Customer is not logged in."
		}));
	}

	action.execute(currentCustomer);
}
