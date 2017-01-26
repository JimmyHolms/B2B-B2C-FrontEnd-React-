import Action from './Action';
import * as ActionMethods from './ActionMethods';
import OfferService from '../services/OfferService';
import BillingAccountService from '../services/BillingAccountService';
import LocalStorageService from '../services/LocalStorageService';
import Error from '../model/Error';
export function fetchMyNextInvoiceDate() {
	const action = new Action(ActionMethods.FETCH_BILLINGACCOUNT, function() {
		const { customerAccount } = LocalStorageService.get("currentCustomer");
		let cats = [];

		BillingAccountService.getNextInvoiceDate(customerAccount).then(accountlist => {
			const { actionStatus } = accountlist;
			if(actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				const {billingAccount={}}  = accountlist;
				this.success(billingAccount.nextInvoiceDate);
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

