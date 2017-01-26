import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class ChargeAggregateStore extends BaseStore{

	constructor() {
		super("CHARGEAGGREGATE", [
			ActionMethods.FETCH_USAGESLIST
		]);
	}
}

MicroEvent.mixin(ChargeAggregateStore);
const chargeAggregateStore = new ChargeAggregateStore();
Dispatcher.register(chargeAggregateStore.handleAction.bind(chargeAggregateStore));
export default chargeAggregateStore;
