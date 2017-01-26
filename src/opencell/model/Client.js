export default class Client {
  constructor(datum) {
    this.account_type = "Client";
    this.username = datum.username;
    this.email = datum.email;
    this.password = datum.password;
    this.first_name = datum.first_name;
    this.last_name = datum.last_name;

    this.mobile = datum.mobile;

    this.mobile = datum.mobile;
    this.address1 = datum.address1;
    this.address2 = datum.address2;
    this.zipcode = datum.zipcode;
    this.city = datum.city;
    this.country = datum.country;
    this.state = datum.state;

    this.paymentMethod = datum.paymentMethod;
    this.country =  datum.country;
    this.mandateIdentification = datum.mandateIdentification;
    this.mandateDate = datum.mandateDate;
    this.electronicBilling = datum.electronicBilling;

  }

  static convertFromProperties(entity) {
      return new Client(entity);
  }

  get meveoJson(){
    return JSON.stringify(this);
  }

  get entityCode(){
    return "Client";
  }

}
