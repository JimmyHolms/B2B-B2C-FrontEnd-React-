import * as ActionMethods from '../actions/ActionMethods';

export default class BaseStore {

	constructor(type, actionMethods) {
		if (type == null || type.trim == '') {
			throw new SelfCareError("Store type cannot be null or empty.");
		}
		if (actionMethods == null || actionMethods.length == 0) {
			throw new SelfCareError("Store actionMethods cannot be null or empty.");
		}
		this.type = type;
		this.loadingMethods = [];
		this.successMethods = [];
		this.errorMethods = [];
		actionMethods.map(method => {
			this.loadingMethods.push(ActionMethods.startMethod(method));
			this.successMethods.push(ActionMethods.successMethod(method));
			this.errorMethods.push(ActionMethods.errorMethod(method));
		});
	}

	get TYPE() {
		return this.type;
	}

	handleAction(action) {
		if (this.loadingMethods.find(method => method === action.actionMethod) != null) {
			return this.trigger(loadingMethod(this.type));
		}
		if (this.successMethods.find(method => method === action.actionMethod) != null) {
			return this.trigger(updateMethod(this.type), action.result);
		}
		if (this.errorMethods.find(method => method === action.actionMethod) != null) {
			return this.trigger(errorMethod(this.type), action.result);
		}
	}

	bindLoadHandler(loaderFunction) {
		this.bind(loadingMethod(this.type), loaderFunction);
	}

	bindUpdateHandler(updateFunction) {
		this.bind(updateMethod(this.type), updateFunction)
	}

	bindErrorHandler(errorFunction) {
		this.bind(errorMethod(this.type), errorFunction)
	}

	unbindLoadHandler(loaderFunction) {
		this.unbind(loadingMethod(this.type), loaderFunction);
	}

	unbindUpdateHandler(updateFunction) {
		this.unbind(updateMethod(this.type), updateFunction)
	}

	unbindErrorHandler(errorFunction) {
		this.unbind(errorMethod(this.type), errorFunction)
	}

}

function loadingMethod(storeMethod) {
	return storeMethod + '_LOADING';
}

function updateMethod(storeMethod) {
	return storeMethod + '_UPDATED';
}

function errorMethod(storeMethod) {
	return storeMethod + '_ERROR';
}