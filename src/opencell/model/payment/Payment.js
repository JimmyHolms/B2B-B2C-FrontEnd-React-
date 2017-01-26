export default class Payment {
	constructor(pay) {
		pay = pay || {}

		this.description = pay.description;
		this.transactionDate = pay.transactionDate;
		this.dueDate = pay.dueDate;
		this.type = pay.type;
		this.paymentMethod = pay.paymentMethod
		this.amount = pay.amount;
	}
}