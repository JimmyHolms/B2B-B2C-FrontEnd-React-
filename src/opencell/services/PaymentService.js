import BaseService from './BaseService';

class PaymentService extends BaseService {

  constructor(){
    super();
    this.serviceUrl = "/api/rest/payment";
  }


  listByCustomerAccount(ca) {
    let url = this.serviceUrl + '/customerPayment?customerAccountCode=' + ca.code;
    return this.opencellAPI.fetch(url,"GET");
  }

  createNewPayment(info ){
	let url = this.serviceUrl + '/create';
	return this.opencellAPI.invokeRequest(info, url, "POST");
  }


}

const paymentService = new PaymentService();

export default paymentService;