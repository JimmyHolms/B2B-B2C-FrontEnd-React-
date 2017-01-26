import OpencellAPI from '../OpencellAPI';
import LocalStorageService from './LocalStorageService';
import * as properties from '../../properties';

export default class BaseService {
	constructor(provider) {
		this.provider = provider || properties.provider;
		this.useMockup = false;
	}

	get opencellAPI() {
		return new OpencellAPI(properties.meveo_path, LocalStorageService.getCredentials(), this.provider);
	}

	get opencellAPI_selfWS() {
		return new OpencellAPI(properties.meveo_path, LocalStorageService.getSelfCredentials(), this.provider);
	}

	notifyActionSuccess(action, entity) {
		console.log("successfully " + action + " entity " + entity);
	}

	notifyActionFailure(action, entity) {
		console.log("failed " + action + " entity " + entity);
	}

	forgotPassword(email) {
		console.log("email: " + email);
		this.opencellAPI_selfWS.forgotPassword(email);
		/*this.opencellAPI_selfWS.forgotPassword(email).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				this.dataList.pop();
				if (callback) {
					callback('error', error);
				}
			}
		);*/
	}

	login(data, callback) {
		//console.log("data login: "+JSON.stringify(data));
		LocalStorageService.setCredentials(data);
		this.opencellAPI.find_user(data.username).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				this.dataList.pop();
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

	contact(data, callback) {
		console.log("data contact: " + data);
		this.opencellAPI.contact(data).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				this.dataList.pop();
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

	findUser(code, callback) {
		this.opencellAPI.find_user(code).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

}
