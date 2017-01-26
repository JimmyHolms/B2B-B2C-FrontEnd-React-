import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class PaymentStore extends BaseStore{

	constructor() {
		super("PAYMENT", [
			ActionMethods.FETCH_PAYMENTS
		]);
	}
}

MicroEvent.mixin(PaymentStore);
const paymentStore = new PaymentStore();
Dispatcher.register(paymentStore.handleAction.bind(paymentStore));
export default paymentStore;