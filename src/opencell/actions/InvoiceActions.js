import Action from './Action';
import * as ActionMethods from './ActionMethods';
import OfferService from '../services/OfferService';
import SubscriptionService from '../services/SubscriptionService';
import InvoiceService from '../services/InvoiceService';
import PaymentService from '../services/PaymentService';
import LocalStorageService from '../services/LocalStorageService';
import Offer from '../model/catalog/Offer';
import Invoice from '../model/invoicing/Invoice';
import Payment from '../model/payment/Payment';
import Subscription from '../model/catalog/Subscription';
import Error from '../model/Error';
/*
export function fetchMyOffer() {
	const action = new Action(ActionMethods.FETCH_MYINVOICE, function(currentCustomer) {
		const { customerAccount: { billingAccount: { userAccount } } } = currentCustomer;
		let subscriptionsList = [];

		SubscriptionService.listByUserAccount(userAccount).then(subscriptionDto => {
			const { actionStatus } = subscriptionDto;
			if(actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {

				const { subscriptions:{subscription=[]} = {} } = subscriptionDto;

				subscription.map( sub => {
					subscriptionsList.push(new Subscription(sub));
				});

				const offerPromises = [];
				subscriptionsList.map(sub => offerPromises.push(OfferService.find(sub.offerTemplate)));

				return Promise.all(offerPromises);
			}
		}).then(offers => {
			offers.map((offerDto, index) => {
				const { actionStatus } = offerDto;
				if(actionStatus == null || actionStatus.status === "FAIL") {
					this.fail(actionStatus);
				} else {
					const subscription = subscriptionsList[index];
					subscription.offerTemplate = new Offer(offerDto);
				}
			});
			const customer = Object.assign({}, currentCustomer);
			customer.customerAccount.billingAccount.userAccount.subscriptions = subscriptionsList;
			this.success(customer);
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
*/
export function fetchMyInvoices() {
	const action = new Action(ActionMethods.FETCH_MYINVOICES, function() {
		const { customerAccount } = LocalStorageService.get("currentCustomer");
		let invs = [];

		InvoiceService.listPresentInAR(customerAccount).then(invoiceDto => {
			const { actionStatus } = invoiceDto;
			if(actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {

				const {CustomerInvoiceDtoList=[]}  = invoiceDto;

				CustomerInvoiceDtoList.map( inv => {
					invs.push(new Invoice(inv));
				});
				//invoices = Object.assign({}, invs);
				console.log('invsList:' + invs);
				this.success(invs);
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

export function fetchPayments() {
	const action = new Action(ActionMethods.FETCH_PAYMENTS, function() {
		const { customerAccount } = LocalStorageService.get("currentCustomer");
		let pays = [];

		PaymentService.listByCustomerAccount(customerAccount).then(paymentDto => {
			const { actionStatus } = paymentDto;
			if(actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {

				const {customerPaymentDtoList=[]}  = paymentDto;

				customerPaymentDtoList.map( pay => {
					pays.push(new Payment(pay));
				});
				//paymentActivities = Object.assign({}, pays);
				console.log('paysList:' + pays);
				this.success(pays);
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

export function createMyPayment (lastinv_num,inv_array, amount) {
	const action = new Action(ActionMethods.CREATE_NEWPAYMENT, function() {
		const { customerAccount } = LocalStorageService.get("currentCustomer");
		
		let results = [];
		let time = Date.now() ;
	
		let info={ 
			"amount": amount,
			"customerAccountCode": customerAccount.code ,
			"description": "Payment from selfcare",
			"isToMatching": true,
			"occTemplateCode": "RG_PLVT",
			"paymentMethod": "DIRECTDEBIT",
			"reference": lastinv_num ,
			"listOCCReferenceforMatching":inv_array,
			"transactionDate": time
			};

		PaymentService.createNewPayment(info).then( result => {
			
			if(result == null || result.status === "FAIL") {
				this.fail({status:result.status,data:[]});
			} else {
				let invs = [];
				InvoiceService.listPresentInAR(customerAccount).then(invoiceDto => {
				const { actionStatus } = invoiceDto;
				if(actionStatus == null || actionStatus.status === "FAIL") {
					this.success({status:result.status,data:invs});
				} else {
					const {CustomerInvoiceDtoList=[]}  = invoiceDto;
					CustomerInvoiceDtoList.map( inv => {
						invs.push(new Invoice(inv));
					});
					this.success({status:result.status,data:invs});
				}
				}).catch(error => {
					this.success({status:result.status,data:invs});
				});
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
