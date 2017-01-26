import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class OrderTrackingStore extends BaseStore{

	constructor() {
		super("ORDER_TRACKING", [
			ActionMethods.TRACK_ORDER,
			ActionMethods.LIST_PENDING_ORDERS
		]);
	}
}

MicroEvent.mixin(OrderTrackingStore);
const orderTrackingStore = new OrderTrackingStore();
Dispatcher.register(orderTrackingStore.handleAction.bind(orderTrackingStore));
export default orderTrackingStore;