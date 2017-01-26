export default class OpencellAPI {

	constructor(host, credentials, providerCode) {
		this.host = host;
		this.providerCode = providerCode;

		this.requestOptions = {
			method: 'POST',
			headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST, PUT',
				'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
				'Access-Control-Max-Age': '1000',
				'Authorization': 'Basic ' + credentials
		  },
			mode: 'cors',
			cache: 'no-cache'
		};
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error
		}
	}

	parseJSON(response) {
		return response.json();
	}

	invokeRequest(payload, url, method) {
		this.requestOptions.body = JSON.stringify(payload);
		return this.fetch(url, method);
	}

	fetch(page, method) {
		this.requestOptions.method = method;
		let self = this;
		return new Promise((resolve, reject) => {
			fetch(this.host + page, this.requestOptions).then(this.checkStatus).then(function (data) {
				data = self.parseJSON(data);
				//console.log('request succeeded with JSON response', data);
				resolve(data);
			}).catch(function (error) {
				//console.log('request failed', error);
				reject(error);
			})
		});
	}

	createCustomEntity(entity) {
		let self = this;
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/api/rest/customEntityInstance/"
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(function (data) {
				data = self.parseJSON(data);
				console.log('request succeeded with JSON response', data);
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	createCRMAccountHierarchy(entity) {
		console.log("createCRMAccountHierarchy....");
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/inbound/"+this.providerCode+"/registration";
		console.log("action: " + action);
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	updateCRMAccountHierarchy(entity) {
		//console.log(entity);
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/api/rest/account/accountHierarchy/updateCRMAccountHierarchy";
		console.log("action: " + action);
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	createOrUpdate(entity) {
		//console.log(entity);
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/api/rest/user/createOrUpdate";
		console.log("action: " + action);
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	forgotPassword(email) {
		let email_data = {"email": email};
		this.requestOptions.method = "POST";
		this.requestOptions.body = JSON.stringify(email_data);
		let action = this.host + "/inbound/"+this.providerCode+"/forgotPassword";
		fetch(action, this.requestOptions);
		/*return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});*/
	}

	resetPassword(pwd) {
		let password_data = {"password": pwd};
		this.requestOptions.method = "POST";
		this.requestOptions.body = JSON.stringify(password_data);
		let action = this.host + "/api/rest/account/resetPassword/";
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	find_user(user_email) {
		let user_data = {"customerCode": user_email};
		this.requestOptions.method = "POST";
		this.requestOptions.body = JSON.stringify(user_data);
		let action = this.host + "/api/rest/account/accountHierarchy/find";
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				// console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				//console.log('request failed', error);
				reject(error);
			})
		});
	}

	contact(contact_data) {
		this.requestOptions.method = "POST";
		this.requestOptions.body = JSON.stringify(contact_data);
		let action = this.host + "/api/rest/account/contact/";
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

}
