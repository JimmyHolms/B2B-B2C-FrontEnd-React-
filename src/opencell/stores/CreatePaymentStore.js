import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class CreatePaymentStore extends BaseStore{

	constructor() {
		super("CREATE_PAYMENT", [
			ActionMethods.CREATE_NEWPAYMENT
		]);
	}
}

MicroEvent.mixin(CreatePaymentStore);
const createpaymentStore = new CreatePaymentStore();
Dispatcher.register(createpaymentStore.handleAction.bind(createpaymentStore));
export default createpaymentStore;