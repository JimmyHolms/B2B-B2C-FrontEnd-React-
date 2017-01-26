export default class MeveoClient {
	constructor(datum) {
		this.crmAccountType = datum.account_type || "Client";
		this.crmParentCode = 'SELLER_FR';
		this.code = datum.username;

		this.description = (!!datum.first_name || !!datum.last_name) ? datum.first_name + " " + datum.last_name : (datum.description || "customer description");
		this.name = {
			"title": datum.title || "M",
			"firstName": datum.first_name,
			"lastName": datum.last_name
		};
		this.address = {
			"address1": datum.address1 || "",
			"address2": datum.address2 || "",
			"address3": '',
			"zipCode": datum.zipcode || "",
			"city": datum.city || "",
			"country": datum.country || "",
			"state": datum.state || ""
		};
		this.contactInformation = {
			"email": datum.email,
			"phone": datum.mobile,
			"mobile": datum.mobile
		};
		this.paymentMethod = datum.paymentMethod || "CHECK",
			this.language = datum.language || 'FRA';
		this.customerCategory = datum.account_type || "Client";
		this.currency = 'EUR';
		this.caStatus = 'ACTIVE';
		this.billingCycle = 'CYC_INV_MT_1';
		this.country = "FR";
		this.baStatus = 'ACTIVE';
		this.email = datum.billingEmail || '';
		this.uaStatus = 'ACTIVE';
		this.mandateIdentification = datum.mandateIdentification || '';
		this.mandateDate = datum.mandateDate || 0;
		this.electronicBilling = datum.electronicBilling || false;
		this.bankCoordinates = {
			"bankCode": datum.bankCode || '',
			"branchCode": datum.branchCode || '',
			"accountNumber": datum.accountNumber || '',
			"key": datum.key || '',
			"iban": datum.iban || '',
			"bic": datum.bic || '',
			"accountOwner": datum.accountOwner || '',
			"bankName": datum.bankName || '',
			"bankId": datum.bankId || '',
			"issuerNumber": datum.issuerNumber || '',
			"issuerName": datum.issuerName || '',
			"ics": datum.ics || ''
		};

		this.customFields = {
			"customField": [
				{
					"code": "password",
					"stringValue": datum.password
				}
			]
		};
	}

	static convertFromProperties(entity) {
		return new MeveoCustomer(entity);
	}

	get meveoJson() {
		return JSON.stringify(this);
	}

}
