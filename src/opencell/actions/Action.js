
import * as ActionMethods from './ActionMethods';
import Dispatcher from '../dispatcher';
import SelfCareError from '../SelfCareError';
import Error from '../model/Error';
import fetch from 'isomorphic-fetch';

export default class Action {

	constructor(actionMethod, actionFunction, options) {
		this.options = options || {};
		if(actionMethod == null || actionMethod.trim() == ''){
			throw new SelfCareError("actionMethod cannot be null or empty.");
		}
		if(typeof actionFunction !== 'function'){
			throw new SelfCareError("actionFunction must be a function.");
		}

		this.actionMethod = actionMethod;
		this.actionFunction = actionFunction;
	}

	execute(...args){
		if(this.options.showLoader) {
			this.start();
		}
		try {
			this.actionFunction(...args);
		} catch(e) {
			this.fail(new Error(e));
		}
	}

	start() {
		Dispatcher.dispatch({
			actionMethod: ActionMethods.startMethod(this.actionMethod)
		});
	}

	success(response) {
		Dispatcher.dispatch({
			actionMethod: ActionMethods.successMethod(this.actionMethod),
			result: response
		});
	}

	fail(error) {
		Dispatcher.dispatch({
			actionMethod: ActionMethods.errorMethod(this.actionMethod),
			result: new Error(error)
		});
	}
}
