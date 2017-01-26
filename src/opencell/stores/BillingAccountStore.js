import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class BillingAccountStore extends BaseStore{

	constructor() {
		super("BillingAccount", [
			ActionMethods.FETCH_BILLINGACCOUNT
		]);
	}
}

MicroEvent.mixin(BillingAccountStore);
const billingAccounttore = new BillingAccountStore();
Dispatcher.register(billingAccounttore.handleAction.bind(billingAccounttore));
export default billingAccounttore;