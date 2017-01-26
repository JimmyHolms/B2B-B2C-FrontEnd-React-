export default class Invoice {
	constructor(inv) {
		inv = inv || {}

		this.invoiceNumber = inv.invoiceNumber;
		this.invoiceDate = inv.invoiceDate;
		this.dueDate = inv.dueDate;
		this.recordedInvoiceDto = inv.recordedInvoiceDto;
		this.amountWithTax = inv.amountWithTax;
		this.pdf = inv.pdf;
		this.netToPay = inv.netToPay;
	}
}