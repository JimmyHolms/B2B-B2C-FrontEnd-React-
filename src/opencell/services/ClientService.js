import Client from '../model/Client';
import MeveoClient from '../model/MeveoClient';
import MeveoUser from '../model/MeveoUser';
import CrudService from './CrudService';

export default class ClientService extends CrudService {

	constructor() {
		super(Client);
		this.useMockup = false;
		if (this.useMockup) {
			this.dataList = [
				new Client({
					id: 1,
					email: "smichea@gmail.com",
					first_name: "Sébastien",
					last_name: "Michéa",
					company: "OpenCell",
					tel: "+3487654432",
					skype: "s.skype",
					website: "",
					acccount_status: 'active',
					newsletter: false,
					password: ""
				}),
			];
		}
		// console.log("created ClientService");
	}


	persist(datum, callback) {
		let entity = new Client(datum);
		let MeveoEntity = new MeveoClient(entity);
		super.persist(MeveoEntity, callback);
	}

	Create(datum) {
		var self = this;
		return new Promise((resolve, reject) => {

			this.persist(datum, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

  update(datum, callback){
       //let entity = new Client(datum);
       let MeveoEntity = new MeveoClient(datum);
       super.update(MeveoEntity, callback);
  }

  UpdateClient(datum){
    return new Promise((resolve, reject) => {
      this.update(datum, (code, response) => {
          (code == 'success')? resolve(response) : reject(response);
      });
    });
  }

	update_user(datum, callback){
       let MeveoEntity = new MeveoUser(datum);
       super.updateUser(MeveoEntity, callback);
  }

  UpdateUser(datum){
    return new Promise((resolve, reject) => {
      this.update_user(datum, (code, response) => {
          (code == 'success')? resolve(response) : reject(response);
      });
    });
  }

}
