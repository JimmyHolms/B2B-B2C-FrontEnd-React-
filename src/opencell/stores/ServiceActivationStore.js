import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class ServiceActivationStore extends BaseStore{

	constructor() {
		super("SERVICE_ACTIVATION", [
			ActionMethods.SERVICE_SUBSCRIBE,
			ActionMethods.SERVICE_TERMINATE
		]);
	}
}

MicroEvent.mixin(ServiceActivationStore);
const serviceActivationStore = new ServiceActivationStore();
Dispatcher.register(serviceActivationStore.handleAction.bind(serviceActivationStore));
export default serviceActivationStore;