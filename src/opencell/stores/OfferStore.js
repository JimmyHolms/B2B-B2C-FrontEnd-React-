import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class OfferStore extends BaseStore{

	constructor() {
		super("OFFERS", [
			ActionMethods.FETCH_OFFERS
		]);
	}
}

MicroEvent.mixin(OfferStore);
const offerStore = new OfferStore();
Dispatcher.register(offerStore.handleAction.bind(offerStore));
export default offerStore;