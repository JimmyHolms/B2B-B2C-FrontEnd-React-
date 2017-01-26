import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class InvoiceStore extends BaseStore{

	constructor() {
		super("BILL", [
			ActionMethods.FETCH_MYINVOICES
		]);
	}
}

MicroEvent.mixin(InvoiceStore);
const invoiceStore = new InvoiceStore();
Dispatcher.register(invoiceStore.handleAction.bind(invoiceStore));
export default invoiceStore;