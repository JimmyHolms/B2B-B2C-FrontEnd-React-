export default class BusinessEntity {
  constructor(code,description) {
      this.code = code;
      this.description = description;
      this.isSynchronized = false;
      console.log("created BusinessEntity");
  }
}
