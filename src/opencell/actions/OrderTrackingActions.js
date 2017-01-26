import Action from "./Action";
import * as ActionMethods from "./ActionMethods";
import OrderTrackingService from "../services/OrderTrackingService";

const PENDING_STATUS_STRINGS = {
	"": "Draft",
	"Acknowledged": "Acknowledged",
	"InProgress": "In Progress",
	"Pending": "Pending",
	"Held": "Held",
	"Partial": "Partial"
};

export function trackOrder(code) {
	const action = new Action(ActionMethods.TRACK_ORDER, function (code) {
		OrderTrackingService.find(code).then(order => {
			this.success([order]);
		}).catch(error => {
			// no error just return empty array
			this.success([]);
		});
	}, {showLoader: false});

	action.execute(code);
}

export function listPendingOrders() {
	const action = new Action(ActionMethods.LIST_PENDING_ORDERS, function () {
		OrderTrackingService.listPendingOrders().then(orders => {
			const pendingOrders = [];
			(orders || []).forEach(order => {
				if(!!PENDING_STATUS_STRINGS[order.state]){
					// display user friendly string instead of API status value
					order.state = PENDING_STATUS_STRINGS[order.state];
					pendingOrders.push(order);
				}
			});
			this.success(pendingOrders);
		}).catch(error => {
			this.fail(error);
		});
	});

	action.execute();
}