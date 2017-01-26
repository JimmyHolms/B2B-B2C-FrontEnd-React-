import BusinessEntity from '../model/BusinessEntity';
import BaseService from './BaseService';

export default class CrudService extends BaseService {
	constructor(entityClass) {
		super();
		this.entityClass = entityClass;
		this.dataListListeners = [];
		this.dataList = [];
		// console.log("created CrudService")
	}

	registerDatalistListener(listener) {
		this.dataListListeners.push(listener);
		//console.log("registered listener")
	}

	notifyDatalistUpdate() {
		for (var listener of this.dataListListeners) {
			//console.log("notify listener")
			listener.datalistUpdated();
		}
	}

	listAll(listUrl) {
		console.log("listAll " + listUrl);
		this.opencellAPI.fetch(listUrl, "GET").then(entityList => {
			//console.log(entityList);
			this.dataList = [];
			for (let entity of entityList) {
				this.dataList.push(this.entityClass.convertFromProperties(entity));
			}
			console.log("before notify dataList size=" + this.dataList.length);
			this.notifyDatalistUpdate();
		});
	}

	persist(entity, callback) {
		//console.log("create :" + entity.meveoJson);
		this.dataList.push(entity);
		this.opencellAPI_selfWS.createCRMAccountHierarchy(entity).then(response => {
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

	update(entity, callback) {
		//console.log("update :" + entity.meveoJson);
		this.opencellAPI.updateCRMAccountHierarchy(entity).then(response => {
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

	updateUser(entity, callback) {
		//console.log("update :" + entity.meveoJson);
		this.opencellAPI.createOrUpdate(entity).then(response => {
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

	resetPassword(pwd, callback) {
		//console.log("password: " + pwd);
		this.opencellAPI.resetPassword(pwd).then(response => {
				if (callback) {
					this.notifyActionSuccess("reset password");
					callback('success', response);
				}
			},
			error => {
				this.dataList.pop();
				if (callback) {
					this.notifyActionFailure("reset password");
					callback('error', error);
				}
			}
		);
	}

}
