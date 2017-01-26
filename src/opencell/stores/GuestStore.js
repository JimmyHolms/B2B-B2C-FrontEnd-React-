import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class GuestStore extends BaseStore {

	constructor() {
		super("GUEST", [
			ActionMethods.SIGNUP_CUSTOMER,
			ActionMethods.FORGOT_PASSWORD
		]);
	}

}

MicroEvent.mixin(GuestStore);
const guestStore = new GuestStore();
Dispatcher.register(guestStore.handleAction.bind(guestStore));
export default guestStore;
