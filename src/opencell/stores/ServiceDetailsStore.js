import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class ServiceDetailsStore extends BaseStore{

	constructor() {
		super("SERVICE_DETAILS", [
			ActionMethods.FETCH_INCOMPATIBLE_SERVICE_DETAILS
		]);
	}
}

MicroEvent.mixin(ServiceDetailsStore);
const serviceDetailsStore = new ServiceDetailsStore();
Dispatcher.register(serviceDetailsStore.handleAction.bind(serviceDetailsStore));
export default serviceDetailsStore;