import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class TerminationReasonsStore extends BaseStore{

	constructor() {
		super("TERMINATION_REASONS", [
			ActionMethods.TERMINATION_REASONS_LIST
		]);
	}
}

MicroEvent.mixin(TerminationReasonsStore);
const terminationReasonsStore = new TerminationReasonsStore();
Dispatcher.register(terminationReasonsStore.handleAction.bind(terminationReasonsStore));
export default terminationReasonsStore;