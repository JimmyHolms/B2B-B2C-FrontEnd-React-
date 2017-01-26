import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class UsageStore extends BaseStore{

	constructor() {
		super("USAGE", [
			ActionMethods.FETCH_MYUSAGES,
			ActionMethods.FETCH_USAGESLIST
		]);
	}
}

MicroEvent.mixin(UsageStore);
const usageStore = new UsageStore();
Dispatcher.register(usageStore.handleAction.bind(usageStore));
export default usageStore;
