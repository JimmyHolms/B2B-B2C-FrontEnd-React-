import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class CustomerStore extends BaseStore {

	constructor() {
		super("CUSTOMER", [
			ActionMethods.GET_CURRENT_CUSTOMER,
			ActionMethods.LOGIN_USER,
			ActionMethods.LOGOUT_CURRENT_CUSTOMER,
			ActionMethods.UPDATE_CUSTOMER,
			ActionMethods.UPDATE_USER
		]);
	}

}

MicroEvent.mixin(CustomerStore);
const customerStore = new CustomerStore();
Dispatcher.register(customerStore.handleAction.bind(customerStore));
export default customerStore;
