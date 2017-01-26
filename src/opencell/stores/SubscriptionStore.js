import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class SubscriptionStore extends BaseStore{

	constructor() {
		super("SUBSCRIPTION", [
			ActionMethods.FETCH_SUBSCRIPTIONS,
			ActionMethods.FETCH_SUBSCRIPTION_BY_CODE,
			ActionMethods.SUBSCRIPTION_CREATE,
			ActionMethods.SUBSCRIPTION_TERMINATE
		]);
	}
}

MicroEvent.mixin(SubscriptionStore);
const subscriptionStore = new SubscriptionStore();
Dispatcher.register(subscriptionStore.handleAction.bind(subscriptionStore));
export default subscriptionStore;