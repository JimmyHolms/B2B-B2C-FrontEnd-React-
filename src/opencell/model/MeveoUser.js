export default class MeveoUser {
  constructor(datum) {
    this.username = datum.username || "";
    this.password = datum.password;
    this.email = datum.email;
  }

  get meveoJson(){
    return JSON.stringify(this);
  }

}
