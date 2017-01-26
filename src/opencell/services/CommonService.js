import CrudService from './CrudService';

export default class CommonService extends CrudService {

	constructor() {
		super();
	}


	forgotPassword(email) {
		super.forgotPassword(email);
		/*return new Promise((resolve, reject) => {
			super.forgotPassword(email, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});*/
	}

	login(data) {
		return new Promise((resolve, reject) => {
			super.login(data, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

	checkLogin() {
		if (localStorage.username) {
			return true;
		} else {
			return false;
		}
	}

	resetPassword(password) {
		return new Promise((resolve, reject) => {
			super.resetPassword(password, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

	contact(data) {
		return new Promise((resolve, reject) => {
			super.contact(data, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

	findUser(code) {
		return new Promise((resolve, reject) => {
			super.findUser(code, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

}
